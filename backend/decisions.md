# Architectural Decisions Log

This file records architectural decisions made for this project, in the order they were made. Add new entries at the bottom; do not rewrite history — if a decision is reversed, add a new entry noting the change instead of editing the old one.

## 2026-07-04 — Initial decisions

1. **PostgreSQL for development.**
   Rationale: production-like relational database for local/dev work; configured via `spring.datasource.*` in `src/main/resources/application.properties`, overridable through `DB_URL` / `DB_USERNAME` / `DB_PASSWORD` env vars.

2. **H2 (in-memory) for tests.**
   Rationale: fast, isolated, no external dependency for the test suite; configured in `src/test/resources/application.properties` with `ddl-auto=create-drop`.

3. **DTOs instead of exposing JPA entities.**
   Rationale: decouples the API contract from persistence models, avoids leaking lazy-loading/serialization issues, and lets the API evolve independently of the database schema. Enforced as an architecture rule in `CLAUDE.md`.

4. **Layered architecture (controller → service → repository), organized by module.**
   Rationale: keeps business logic out of controllers, keeps DB access isolated to repositories, and mirrors the module breakdown in `docs/backend-spec.md` (`auth`, `owner`, `pet`, `vet`, `visit`, `vaccination`, `invoice`, `dashboard`, `common`, `security`, `config`).

5. **JWT authentication.**
   Rationale: stateless auth suitable for a SPA frontend; first phase covers register/login/me only — no refresh tokens, no forgot-password (deliberately deferred, see `docs/backend-spec.md` Security section).

6. **English for project docs/code; Turkish for conversational explanations.**
   Rationale: code, class/method names, README, docs, and this decisions log stay in English for consistency and future maintainability; the working conversation with the project owner (who is learning Claude Code) happens in Turkish.

7. **Java 17.**
   Rationale: already configured in `pom.xml` (`<java.version>17</java.version>`) with Spring Boot 3.5.16; kept as-is rather than upgrading to 21, since the project already builds successfully on 17.

8. **Standard `PageResponse` DTO for all listing endpoints.**
   Rationale: frontend listing pages (pets, owners, visits, invoices) all need consistent pagination metadata (`content`, `page`, `size`, `totalElements`, `totalPages`, `last`); a single shared DTO avoids per-endpoint drift. Documented in `docs/api-contract.md`.

9. **Standard global error response shape via `GlobalExceptionHandler`.**
   Rationale: consistent `{ timestamp, status, error, message, path, fieldErrors }` shape across all endpoints simplifies frontend error handling. Documented in `docs/api-contract.md`.

10. **Backend-calculated invoice totals and vaccination due dates; frontend values are never trusted.**
    Rationale: financial and medical-schedule correctness must not depend on client-side logic. Detailed in `docs/business-rules.md`.

## 2026-07-05 — Clarifications

11. **`ADMIN` is a system/dev convenience role, not a domain entity.**
    Rationale: the original persona document only defines `RECEPTIONIST` and `VET`; `ADMIN` was added for development, seed data, and full-access administration. No `Admin` entity/table is created — `ADMIN` remains solely a value of the `Role` enum. Roles stay `ADMIN`, `VET`, `RECEPTIONIST`. Documented in `docs/backend-spec.md` and `docs/business-rules.md` (Rule 13).

12. **Owner deletion is blocked (`409 Conflict`) if the owner has any pets; no cascade delete, no auto-archive.**
    Rationale: prevents accidental data loss of pet records via owner deletion, and keeps pet lifecycle management (archive/activate) as the single, explicit path for that resource. If the owner has no pets, deletion is allowed (`204 No Content`). Owner responses include `petCount` so the frontend can pre-emptively disable/confirm the action. Documented in `docs/business-rules.md` (Rule 12) and `docs/api-contract.md`.

13. **Refined role permissions: RECEPTIONIST can add pet weight records but cannot create/update vaccinations.**
    Rationale: weighing naturally happens at check-in, so it fits the receptionist's front-desk workflow; vaccinations remain a clinical/medical record restricted to VET/ADMIN, consistent with the existing treatment-notes restriction. Documented in `docs/business-rules.md` (Rule 13) and `docs/api-contract.md`.

14. **Standardized HTTP status/response conventions across all endpoints for frontend UX patterns (loading, toast, empty state, confirmation modal).**
    Rationale: the frontend needs predictable status codes to drive generic UI behavior — `201` create, `200` update/action/archive-activate, `204` real delete, `409` on dependency conflicts (e.g. owner-with-pets delete), empty `PageResponse` (`content: []`) instead of `404` for empty listings, and `ApiErrorResponse` for all error cases including field-level validation errors. Documented in `docs/api-contract.md` (§3, §3.1).

## 2026-07-08 — Test config hygiene

15. **`src/test/resources/application.properties` is no longer committed; `application.properties.example` is the tracked template. Test classes read seed credentials via `@Value` injection instead of hardcoded string literals.**
    Rationale: the file only ever held fake H2/demo-seed values (no real system was ever protected by them — confirmed no real secret was ever committed, even before `src/main/resources/application.properties` was gitignored), but keeping plaintext-looking credentials out of version control avoids false-positive secret-scanning noise and matches the same pattern already used for `src/main/resources/application.properties`. Each developer copies the `.example` file locally once; test behavior is unchanged.

## 2026-07-10 — Corrected vaccination interval rule (project assumption)

16. **[PROJECT ASSUMPTION] `Vaccination.nextDueDate` interval logic uses only `+1 year` (default) / `+3 years`, keyed off generic demo type identifiers (`ONE_YEAR`, `THREE_YEAR`), not real vaccine names.**
    Rationale: an earlier implementation pass invented a hardcoded interval table (`RABIES`, `LEPTOSPIROSIS` → 1 year, `BORDETELLA` → 6 months) that is not supported by the source assignment spec — the spec only defines a `+1 year` / `+3 years` rule by vaccine type and does not name real vaccines. That invented table has been removed from `VaccinationService` and from the test suite. The real clinic vaccine catalog (which type maps to 1 year vs. 3 years) is an explicit open product decision, deferred until confirmed. Documented in `docs/business-rules.md` (Rule 3).
    **Process note going forward**: any domain rule not explicitly stated in the source spec must be recorded here as a `[PROJECT ASSUMPTION]` entry and confirmed with the project owner before implementation — not invented ad hoc in code.
    **Update (2026-07-10)**: confirmed against the actual source document (`intern-react-js-assignment.pdf`, §2.6 rule 4: "When vaccine type is selected, fill +1 year / +3 years based on type") — the fix matches the spec verbatim.

## 2026-07-10 — Source PDF cross-check

17. **[PROJECT ASSUMPTION, confirmed] `Invoice` is many-to-one to `Visit` (a visit can have more than one invoice), not one-to-one.**
    Rationale: the source PDF's entity table lists `Invoice: N → 1 Visit`. An earlier pass in `docs/backend-spec.md` had assumed strict 1:1 ("one Visit can have one Invoice") without checking the source document. Corrected in `docs/backend-spec.md` §7 to allow multiple invoices per visit (e.g. re-issue, split billing). No code was affected — the `invoice` module is not yet implemented (task 28+).

18. **[PROJECT ASSUMPTION, confirmed] The backend does not implement a "suggest alternative slots" endpoint for the appointment-overlap rule.**
    Rationale: the source PDF says a conflicting save should "reject the save and propose alternative slots" (§2.6 rule 2). The backend's responsibility is limited to rejecting the conflicting write (`409 Conflict`, already implemented in `VisitService`); computing/proposing alternative free slots is a frontend-only concern derived from existing calendar/visit-list endpoints. Confirmed with project owner; documented in `docs/business-rules.md` (Rule 1).

## 2026-07-11 — Allergy warning without a Drug catalog (project assumption)

19. **[PROJECT ASSUMPTION, confirmed] Allergy/contraindication warning (Rule 7) is implemented as free-text substring matching between `Visit.treatmentNotes` and `Pet.allergies`, with no `Drug`/`TreatmentDrug` entity.**
    Rationale: the source PDF's rule ("when a drug is selected in Visit > Treatment, if it appears in Pet.allergies show a red warning") implies a structured drug-selection field, but the PDF's own 5-entity table never defines a `Drug` catalog, and `docs/backend-spec.md` §6.2 already lists `Drug`/`TreatmentDrug` as an optional/later-phase entity. Rather than inventing a drug catalog not requested by the spec, the vet enters the drug name as free text inside `treatmentNotes` (already captured via `PATCH /api/visits/{id}/medical-notes`, task 32); the backend does a case-insensitive substring match of each comma/semicolon-separated token in `Pet.allergies` against `treatmentNotes` and returns a non-blocking `warnings: string[]` field on `VisitResponse`. Confirmed with the project owner (and relayed to the frontend developer) before implementation. Implemented in `visit/AllergyWarningChecker`. Documented in `docs/business-rules.md` (Rule 7) and `docs/api-contract.md` (§5.5).

## 2026-07-11 — Frontend request: "remember me" / "forgot password"

20. **Neither self-service "forgot password" (email/token flow) nor "remember me" (long-lived/refresh JWT) will be added. Instead, an ADMIN-only manual password reset endpoint is added (task 34).**
    Rationale: the frontend developer asked for both. `docs/backend-spec.md`/`CLAUDE.md` already deferred forgot-password and refresh tokens for the first phase (decision 5). With only 3 real users (1 receptionist, 2 vets), the email/token infrastructure (sender, expiry, rate limiting, anti-enumeration) needed for self-service reset isn't worth the added attack surface. "Remember me" would mean a long-lived JWT with no revocation mechanism — if it leaks (e.g. XSS), an attacker gets extended access to medical/PII data with no way to invalidate it short of rotating the signing key for everyone. The chosen alternative — an ADMIN sets/generates a new password for a user via a dedicated endpoint, communicated out-of-band — needs no new infrastructure and keeps token lifetime short. Relayed to the frontend developer; see task 34 in `docs/implementation-tasks.md`.

## 2026-07-12 — Stronger password policy (out-of-scope addition)

21. **Password strength requirements were tightened beyond the original min-8-characters rule: passwords must now also contain at least one uppercase letter, one lowercase letter, one digit, and one punctuation character.**
    Rationale: not part of `docs/backend-spec.md`'s original scope, but requested directly by the project owner after reviewing task 34 (admin password reset) — an 8-character-minimum-only policy was judged too weak for a system holding medical/PII data, even with only 3 real users. Applied consistently to both `POST /api/auth/register` (`password`) and `PATCH /api/auth/users/{id}/reset-password` (`newPassword`) via the same `@Pattern` regex on the request DTOs, so self-registration and admin-driven resets can't bypass each other's rule. `LoginRequest.password` is unaffected (login must still accept passwords created before this rule, e.g. any seeded/demo accounts). Added as task 35 in `docs/implementation-tasks.md`, renumbering the previous tasks 35-50 to 36-51.

## 2026-07-12 — pendingVaccinations KPI definition (project assumption, confirmed)

22. **[PROJECT ASSUMPTION, confirmed] The `pendingVaccinations` dashboard KPI (task 36) counts existing `Vaccination` records whose `nextDueDate` is today or in the past (overdue/due). It does not attempt to detect pets that have never received an expected vaccine.**
    Rationale: the source PDF only lists "pending vaccinations" as a bare KPI card label with no calculation rule (confirmed by re-reading `intern-react-js-assignment.pdf`), and `docs/business-rules.md` Rule 10 explicitly defers the exact logic to this implementation task. Detecting "missing" vaccines (pets that should have received one but never did) would require a species/age-based expected-vaccine schedule, which does not exist as structured data — no `Drug`/vaccine catalog was introduced (consistent with decision 16's "no invented catalog" precedent). The simpler, well-defined interpretation was chosen: `COUNT(Vaccination WHERE nextDueDate <= today)`. The separate `upcomingVaccinationAlerts` list (task 40) covers "due soon" cases; a broader window was considered for `pendingVaccinations` (overdue + next 30 days) but rejected to avoid overlapping meaning with that list. Confirmed with the project owner before implementation. Implemented in `dashboard/DashboardService.getSummary()`.

## 2026-07-12 — Revenue chart definitions (project assumption, confirmed)

23. **[PROJECT ASSUMPTION, confirmed] `monthlyRevenue` and `revenueByCategory` (task 37) count every issued `Invoice`/`InvoiceItem` regardless of `InvoiceStatus` (DRAFT/SENT/PAID all included), keyed off `Invoice.issuedAt`. `monthlyRevenue` covers a rolling 12-month window (current month back 11 months, zero-filled for months with no invoices); `revenueByCategory` covers the same 12-month window and always returns all 5 `InvoiceItemCategory` values (zero-filled if unused).**
    Rationale: the source PDF's acceptance flow explicitly says "(e) Issue an invoice and see the dashboard revenue increase" — revenue is expected to move at invoice-issue time, not at payment time, so `PAID`-only would contradict the spec's own demo flow. The 12-month window has no explicit spec definition (only the separate Pet weight-trend chart is explicitly "last 12 months"); the same window was reused here for consistency and because "all-time" would grow unbounded and isn't useful for a monthly bar chart. Confirmed with the project owner before implementation. Implemented in `dashboard/DashboardService.buildMonthlyRevenue()` / `buildRevenueByCategory()`, backed by new `InvoiceRepository.findByIssuedAtGreaterThanEqual` and `InvoiceItemRepository.findByInvoice_IssuedAtGreaterThanEqual`.

## 2026-07-12 — Appointment trend/YTD chart definitions

24. **`appointmentTrend30Days` and `cumulativeAppointmentsYtd` (task 38) both exclude `CANCELLED` visits, consistent with the `todayAppointments` KPI (decision/task 36).**
    Rationale: keeping the "does a visit count as an appointment" rule consistent across every dashboard chart avoids the KPI card and the charts telling contradictory stories (e.g. `todayAppointments` excluding a cancelled visit while the trend line still counts it). `appointmentTrend30Days` is a fixed 30-day window (today back 29 days), zero-filled per day. `cumulativeAppointmentsYtd` is a running monthly total from January 1 of the current year: each completed month's data point is dated at that month's last day, while the current (in-progress) month's data point is dated today and reflects the cumulative count as of today (not projected through month-end), matching standard "year to date" semantics. Implemented in `dashboard/DashboardService.buildAppointmentTrend30Days()` / `buildCumulativeAppointmentsYtd()`, backed by new `VisitRepository.findByStatusNotAndScheduledAtBetween`.

## 2026-07-13 — Vet-by-vet appointment count window

25. **`appointmentsByVet` (task 39) counts non-`CANCELLED` visits from January 1 of the current year through today (same YTD window as `cumulativeAppointmentsYtd`), and always includes every currently-active `Vet` (zero-filled if a vet has no visits this year). Archived/inactive vets are omitted.**
    Rationale: neither `docs/backend-spec.md` §12/§13 nor the `docs/api-contract.md` example response specify a time window for this "vet-by-vet appointment count stacked bar" chart. Reusing the YTD window keeps it consistent with the adjacent cumulative-appointments chart (both reset yearly, both exclude `CANCELLED` per decision 24) rather than growing unbounded as an all-time total would. Confirmed with the project owner before implementation. Zero-filling every active vet (mirroring the all-`InvoiceItemCategory` zero-fill in decision 23) lets the stacked bar chart compare all current vets, not just ones with visits this year. Implemented in `dashboard/DashboardService.buildAppointmentsByVet()`, backed by new `VetRepository.findByActiveTrue()`; reuses the same YTD `Visit` list already fetched for `cumulativeAppointmentsYtd` to avoid a duplicate query.

## 2026-07-13 — Today schedule + alert windows (task 40)

26. **`upcomingVaccinationAlerts` uses a 30-day forward window (`nextDueDate <= today + 30 days`, nulls excluded), which also naturally includes already-overdue vaccinations. `overdueFollowUpAlerts` includes only `COMPLETED` visits whose `followUpDate` is strictly before today; it does not check whether a follow-up visit was actually created (task 43, the follow-up creation endpoint, isn't implemented yet). `todaySchedule` reuses the existing `todayAppointments` KPI window (non-`CANCELLED` visits scheduled today, decision/task 36) but returns the full visit list instead of a count, ordered by `scheduledAt` ascending.**
    Rationale: `docs/business-rules.md` §10 documents age-based vaccination expectations but leaves the exact "upcoming" window as dashboard-module implementation detail; 30 days was confirmed with the project owner as a reasonable early-warning horizon before implementation. Overdue follow-up detection is intentionally simple for now since there's no follow-up-visit linkage yet to distinguish "already rescheduled" from "still pending" — this will need revisiting once task 43 ships. Implemented in `dashboard/DashboardService.buildTodaySchedule()` / `buildUpcomingVaccinationAlerts()` / `buildOverdueFollowUpAlerts()`, backed by new `VisitRepository.findByStatusNotAndScheduledAtBetweenOrderByScheduledAtAsc()` / `findByStatusAndFollowUpDateBeforeOrderByFollowUpDateAsc()` and `VaccinationRepository.findByNextDueDateLessThanEqualOrderByNextDueDateAsc()`. `DashboardService.getSummary()` is now `@Transactional(readOnly = true)` since these new builders access lazily-loaded `Pet`/`Vet` names that previously threw `LazyInitializationException` outside a session.

## 2026-07-13 — Vet performance metrics (task 42)

27. **`GET /api/vets/{id}/performance` (ADMIN-only) returns `totalVisitsYtd` (all visits regardless of status, January 1 of the current year through today), `completedVisitsYtd`, `cancelledVisitsYtd` (both same YTD window, filtered by status), `upcomingVisits` (non-`CANCELLED` visits with `scheduledAt` at/after the current moment, no YTD bound), and `revenueGeneratedYtd` (sum of `total` on `PAID` invoices whose visit belongs to this vet, issued from January 1 of the current year).**
    Rationale: neither `docs/backend-spec.md` (no §11.4 "Vet Detail" section) nor `docs/api-contract.md` §5.4 specify the performance metric set or window; the YTD convention was chosen to stay consistent with `appointmentsByVet` (decision 25) and confirmed with the project owner before implementation. `totalVisitsYtd` deliberately counts every status (not just non-`CANCELLED` like the dashboard KPIs) so that `completedVisitsYtd` and `cancelledVisitsYtd` read as a breakdown of the total rather than contradicting it. `upcomingVisits` uses "now" rather than a YTD bound since it answers "how booked up is this vet going forward," not a year-to-date question. Only `PAID` invoices count toward revenue (not `DRAFT`/`SENT`), consistent with the "backend never trusts unpaid totals as realized revenue" spirit of the invoice module. Implemented in `vet/VetService.getPerformance()`, backed by new `VisitRepository.countByVet_IdAndScheduledAtBetween()` / `countByVet_IdAndStatusAndScheduledAtBetween()` / `countByVet_IdAndStatusNotAndScheduledAtGreaterThanEqual()` and `InvoiceRepository.findByStatusAndVisit_Vet_IdAndIssuedAtGreaterThanEqual()`.

## 2026-07-13 — Follow-up visit creation (task 43)

28. **`POST /api/visits/{id}/follow-up` (ADMIN/VET only) takes no request body. The source visit must be `COMPLETED` with a non-null `followUpDate`, otherwise `409 Conflict`. On success it creates a new `SCHEDULED` visit for the same pet/vet at `followUpDate` 09:00 (fixed default time), with `chiefComplaint` set to the fixed string `"Follow-up visit"`. It is subject to the same ±15-minute vet overlap rule as any other visit creation (`409 Conflict` if the slot is taken).**
    Rationale: `docs/business-rules.md` §9 only specifies that the backend "supports follow-up creation or suggestion" — the suggestion half is `overdueFollowUpAlerts` (decision 26); this is the creation half. Neither doc specifies whether the caller can pick a custom time. A fixed default time was confirmed with the project owner over an optional `scheduledAt` request field, to keep the endpoint's contract at zero request fields — if the default slot conflicts, the frontend falls back to the existing "New Visit" flow to pick a different time rather than this endpoint growing a scheduling UI of its own. RECEPTIONIST is blocked with the same Spring Security annotation + service-layer check pattern as `updateMedicalNotes` (decision/rule 5), since follow-up planning is medical judgment. Implemented in `visit/VisitService.createFollowUp()`, reusing the existing `checkNoOverlap()` used by visit create/update.

## 2026-07-13 — Inactive pet computation (task 44)

29. **`PetResponse.inactive` is `true` when the pet's most recent non-`CANCELLED` visit's `scheduledAt` is more than 2 years ago; if the pet has no non-`CANCELLED` visits at all, `Pet.createdAt` is used as the reference point instead (per `docs/business-rules.md` §6). It is computed on every read (create/update/get/list/archive/activate/owner-detail's pet list), never stored.**
    Rationale: `docs/business-rules.md` §6 specifies the >2-years-without-a-visit rule and the "pet creation date if no visits exist" fallback directly, but doesn't say whether a `CANCELLED` visit counts as "having been seen." Excluding `CANCELLED` was confirmed with the project owner, for consistency with the existing "does a visit count as an appointment" convention used throughout the dashboard KPIs (decision 24) and vet performance (decision 27) — a cancelled visit means the pet was *not* actually seen. Implemented as a public `PetService.isInactive(Pet)` method (backed by new `VisitRepository.findTopByPet_IdAndStatusNotOrderByScheduledAtDesc()`) so `OwnerService.getById()` can reuse the exact same rule when rendering a pet's `inactive` flag inside the owner detail response's pet list, instead of duplicating the computation.
