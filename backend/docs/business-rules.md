# Business Rules — Veterinary Clinic Management System

This document details every backend business rule. Each rule states what must happen, the entities involved, and the expected enforcement point (service layer, unless noted).

## 1. Appointment Overlap Rule

**Rule**: The same vet cannot have overlapping appointments within ±15 minutes.

- When creating or rescheduling a `Visit`, the backend checks existing `Visit`s for the same `vetId` where `scheduledAt` falls within 15 minutes before or after the requested `scheduledAt`.
- Cancelled visits (`status = CANCELLED`) are excluded from the overlap check.
- On conflict, the backend rejects the request with a `409 Conflict` (or `400 Bad Request` with a clear message), not a silent adjustment.
- Enforced in `VisitService`, not in the controller or repository.
- Suggesting alternative free slots after a conflict is a frontend-only concern (computed client-side from the existing calendar/visit-list endpoints) — the backend does not expose a dedicated "suggest alternative slots" endpoint.

## 2. Soft Delete for Pets

**Rule**: A pet must never be hard-deleted. Use archive/activate instead.

- `Pet.archived` (boolean) is the source of truth.
- `PATCH /api/pets/{id}/archive` sets `archived = true`.
- `PATCH /api/pets/{id}/activate` sets `archived = false`.
- Listing endpoints filter by `archived` via an explicit `active`/`archived` query parameter; default listing behavior should be documented and consistent (do not silently hide archived pets without a filter option).
- No `DELETE /api/pets/{id}` endpoint exists.
- See also Rule 12 (Owner Deletion Rule) — deleting an `Owner` never cascades to its `Pet`s and never auto-archives them.

## 3. Vaccination Next Due Date Calculation

**Rule**: `Vaccination.nextDueDate` is always calculated by the backend, never accepted from the client.

- Calculated at creation/update time based on `vaccineType` and `administeredAt`: `+3 years` for a three-year type, `+1 year` (default) otherwise. This is the only interval rule the source spec defines — it does not name real vaccines. Enforced in `VaccinationService`, not the controller.
- The current implementation uses generic demo/example type identifiers (`ONE_YEAR`, `THREE_YEAR`) to exercise this rule, since the spec gives no real vaccine catalog. Mapping real clinic vaccine names to `+1 year` / `+3 years` is a later product decision — see `decisions.md`.
- If the request body includes a `nextDueDate`, it is ignored (the field is not even present on `VaccinationRequest`).

## 4. Invoice Calculation Rule

**Rule**: `Invoice.subtotal`, VAT rate (18%), `vatAmount`, and `total` are always calculated by the backend. The frontend is never trusted for these values.

- `subtotal` = sum of `InvoiceItem.lineTotal` (`quantity * unitPrice`).
- `vatRate` = 0.18 (fixed, first phase — do not accept from client).
- `vatAmount` = `subtotal * vatRate`.
- `total` = `subtotal + vatAmount`.
- If the client submits `subtotal`, `vatAmount`, or `total` in the request body, these fields are ignored and recomputed server-side.

## 5. Treatment Notes Role Rule

**Rule**: RECEPTIONIST cannot edit treatment notes. VET and ADMIN can.

- Enforced on `PATCH /api/visits/{id}/medical-notes` (covers `diagnosis`, `treatmentNotes`, `followUpDate`).
- Enforced via Spring Security method/role authorization plus an explicit service-layer check, so the rule holds even if route-level security configuration changes.
- A RECEPTIONIST calling this endpoint receives `403 Forbidden`.
- See also Rule 13 (Role Permission Clarifications) for the equivalent rules on vaccinations and weight records.

## 6. Inactive Pet Rule

**Rule**: If a pet has had no visits for more than 2 years, it is shown as inactive.

- This is a derived/computed status, not a stored field — computed from the most recent `Visit.scheduledAt` for the pet (or pet creation date if no visits exist).
- Exposed as a read-only field (e.g. `inactive: true/false`) on pet detail/listing responses; does not affect `archived`, which is a separate, explicit soft-delete flag.

## 7. Drug/Allergy Conflict Warning

**Rule**: If a selected drug conflicts with the pet's recorded allergies, the backend returns a warning.

- `Pet.allergies` is a free-text field in the current phase (structured `Drug`/`TreatmentDrug` entities are a later-phase addition).
- When treatment notes reference a drug (or when the later-phase `Drug`/`TreatmentDrug` entities are introduced), the backend checks the drug name/class against `Pet.allergies` text and returns a non-blocking warning in the response (e.g. `warnings: ["Pet is recorded as allergic to Penicillin"]`), not a hard error — the vet makes the final call.

## 8. Species/Breed Conditional Rule

**Rule**: If species is not CAT or DOG, breed should not be required, and `speciesNote` can be used instead.

- Validation on `Pet` create/update:
  - If `species` is `CAT` or `DOG`: `breed` may be provided and is the primary descriptor.
  - If `species` is anything else: `breed` is optional/not required; `speciesNote` is the field used to capture free-text species detail.
- Enforced via custom validation logic in the service layer (a simple `@NotBlank` on `breed` would be incorrect here).

## 9. Follow-Up Rule

**Rule**: When a visit is completed and `followUpDate` exists, the backend supports follow-up creation or suggestion.

- When `Visit.status` transitions to `COMPLETED` and `followUpDate` is set, `POST /api/visits/{id}/follow-up` can be used to create a new `SCHEDULED` visit for the same pet/vet on/around `followUpDate`, or to surface it as a dashboard suggestion/alert (see `overdueFollowUpAlerts` in the dashboard summary).
- A follow-up that has passed its `followUpDate` without a completed follow-up visit is surfaced as an "overdue follow-up" alert on the dashboard.

## 10. Age-Based Vaccination Expectations

**Rule**: Documented expectations, not necessarily hard-blocking validation:

- Pet older than 1 year: annual rabies vaccine is visible/expected; the dashboard/vaccination views should be able to flag when it is missing or overdue.
- Pet younger than 1 year: puppy/kitten vaccination series warning expected around 6, 8, and 12 weeks of age.
- These expectations inform the `pendingVaccinations` dashboard KPI and the `upcomingVaccinationAlerts` list — implementation detail (exact scheduling logic) is refined during the vaccination module task in `docs/implementation-tasks.md`.
- Scope note: `GET /api/pets/{id}/vaccinations` (pet vaccination history, task 26) exposes the raw records the frontend needs to derive these warnings (pet's `birthDate` from the pet endpoint + vaccination list). The actual "missing/overdue" flag computation is server-side work that lands in the Dashboard module (`pendingVaccinations` KPI — task 34; `upcomingVaccinationAlerts` — task 38), not on the pet vaccination history endpoint itself.

## 11. General Enforcement Principles

- All of the above rules are enforced in the **service layer**, never in controllers or repositories.
- Role-based rules (treatment notes, invoice actions, etc.) are enforced with Spring Security annotations **and** a service-layer check, so the rule survives changes to route configuration.
- Calculated fields (invoice totals, vaccination due dates) are always recomputed server-side and never trust client-submitted values for the same field.

## 12. Owner Deletion Rule

**Rule**: `DELETE /api/owners/{id}` is only allowed when the owner has no pets.

- If the `Owner` has one or more `Pet`s (regardless of `archived` status), the backend rejects the request with `409 Conflict` and a clear message (e.g. `"Owner has 2 pet(s) and cannot be deleted"`).
- If the `Owner` has no `Pet`s, deletion proceeds normally and returns `204 No Content`.
- Deleting an owner never cascades to delete its pets, and never auto-archives them — pet lifecycle is managed independently via archive/activate (Rule 2).
- Owner list/detail responses include `petCount` so the frontend can proactively disable the delete action or show a confirmation/error message before the request is even sent.
- Enforced in `OwnerService`, not in the controller or repository.

## 13. Role Permission Clarifications

**Rule**: Role responsibilities, stated precisely for cases not fully covered by Rule 5.

- `ADMIN` can manage all resources. `ADMIN` is a backend/system convenience role for development, seed data, and administration — it is not a domain entity derived from the original persona document (only `RECEPTIONIST` and `VET` are persona-derived). There is no `Admin` entity.
- `VET` can manage medical data: diagnosis, treatment notes, follow-up data, vaccinations, and weight records.
- `RECEPTIONIST` can create/update owners, pets, visits, and invoices.
- `RECEPTIONIST` cannot edit treatment notes (Rule 5) and cannot create/update/delete vaccinations — vaccination write endpoints are `ADMIN`/`VET` only.
- `RECEPTIONIST` **can** add pet weight records (`POST /api/pets/{id}/weight-records`), since weighing typically happens during check-in.
- As with Rule 5, these role checks are enforced with Spring Security annotations **and** a service-layer check.
