# API Contract — Veterinary Clinic Management System

This document is the contract between the backend and the React frontend. It covers the endpoint list, request/response examples, pagination format, error format, enum values, and the auth header format.

All endpoints are prefixed with `/api`.

## 1. Auth Header Format

Authenticated requests must send:

```
Authorization: Bearer <jwt-token>
```

## 2. Standard Pagination Response — `PageResponse<T>`

Every listing endpoint returns this shape:

```json
{
  "content": [ /* array of items */ ],
  "page": 0,
  "size": 20,
  "totalElements": 137,
  "totalPages": 7,
  "last": false
}
```

## 3. Standard Error Response — `ApiErrorResponse`

```json
{
  "timestamp": "2026-07-04T10:15:30",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/pets",
  "fieldErrors": [
    { "field": "name", "message": "must not be blank" }
  ]
}
```

Every error response (validation, not-found, conflict, forbidden, etc.) uses this same `ApiErrorResponse` shape, so the frontend can rely on one error-handling path for toasts and error states. Validation errors (`400`) populate `fieldErrors`; other error types leave it empty/omitted.

## 3.1 HTTP Status Code Conventions

These conventions apply consistently across all modules so the frontend can drive loading/toast/confirmation-modal behavior off the status code alone:

| Situation | Status | Body |
|---|---|---|
| Create endpoint succeeds | `201 Created` | created resource |
| Update endpoint succeeds | `200 OK` | updated resource |
| Status/action endpoint succeeds (e.g. visit status change, mark-paid) | `200 OK` | updated resource or action result |
| Archive/activate endpoint succeeds | `200 OK` | updated resource |
| Real delete succeeds (deletion allowed) | `204 No Content` | empty |
| Delete rejected due to a dependency conflict (e.g. owner with pets) | `409 Conflict` | `ApiErrorResponse` |
| Validation failure | `400 Bad Request` | `ApiErrorResponse` with `fieldErrors` |
| Listing endpoint with no matching data | `200 OK` | `PageResponse` with `content: []` (never `404`) |

Note: soft-deletable resources (e.g. `Pet`) have no "real delete" endpoint at all — archive/activate is the only lifecycle transition, per `docs/business-rules.md`.

## 4. Enum Values Reference

- **Role**: `ADMIN`, `VET`, `RECEPTIONIST`
- **VisitStatus**: `SCHEDULED`, `CHECKED_IN`, `IN_EXAM`, `COMPLETED`, `CANCELLED`
- **InvoiceStatus**: `DRAFT`, `SENT`, `PAID`
- **InvoiceItemCategory**: `CONSULTATION`, `VACCINATION`, `SURGERY`, `HOSPITAL`, `OTHER`

## 5. Endpoints

### 5.1 Auth

| Method | Path | Roles | Description |
|---|---|---|---|
| POST | `/api/auth/register` | public | Register a new user |
| POST | `/api/auth/login` | public | Login, returns JWT |
| GET | `/api/auth/me` | authenticated | Current user info |
| PATCH | `/api/auth/users/{id}/reset-password` | ADMIN | Admin sets a new password for a user (no email/token flow — see `decisions.md` entry 20) |

**POST /api/auth/login — request**
```json
{
  "email": "receptionist@clinic.com",
  "password": "secret123"
}
```

**POST /api/auth/login — response**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "fullName": "Ayşe Yılmaz",
    "email": "receptionist@clinic.com",
    "role": "RECEPTIONIST"
  }
}
```

**PATCH /api/auth/users/{id}/reset-password — request**
```json
{
  "newPassword": "Temp-Password-123!"
}
```

**PATCH /api/auth/users/{id}/reset-password — response**
```json
{
  "id": 3,
  "fullName": "Ali Kaya",
  "email": "ali.kaya@clinic.com",
  "role": "VET"
}
```

> No email is sent and no reset token/link is generated — the admin communicates the new password to the user out-of-band (verbally, in person, etc.). Response never echoes the password back.

> **Password policy** (applies to both `POST /api/auth/register`'s `password` and this endpoint's `newPassword`): at least 8 characters, with at least one uppercase letter, one lowercase letter, one digit, and one punctuation character. Violations return `400` with a `fieldErrors` entry (see `decisions.md` entry 21).

### 5.2 Owners

| Method | Path | Roles | Description |
|---|---|---|---|
| GET | `/api/owners` | ADMIN, VET, RECEPTIONIST | List owners (search, pagination) |
| POST | `/api/owners` | ADMIN, RECEPTIONIST | Create owner |
| GET | `/api/owners/{id}` | ADMIN, VET, RECEPTIONIST | Owner detail (pets, invoices) |
| PUT | `/api/owners/{id}` | ADMIN, RECEPTIONIST | Update owner |
| DELETE | `/api/owners/{id}` | ADMIN | Delete owner (only if owner has no pets) |

**POST /api/owners — request**
```json
{
  "firstName": "Mehmet",
  "lastName": "Demir",
  "phone": "+90 555 123 4567",
  "email": "mehmet.demir@example.com",
  "address": "Istanbul, Turkey"
}
```

**POST /api/owners — response**
```json
{
  "id": 12,
  "firstName": "Mehmet",
  "lastName": "Demir",
  "phone": "+90 555 123 4567",
  "email": "mehmet.demir@example.com",
  "address": "Istanbul, Turkey",
  "petCount": 0,
  "createdAt": "2026-07-04T10:00:00",
  "updatedAt": "2026-07-04T10:00:00"
}
```

> `petCount` is always included on owner list/detail responses (see `docs/business-rules.md`, Owner Deletion Rule).

**DELETE /api/owners/{id} — conflict response (owner still has pets)**
```json
{
  "timestamp": "2026-07-04T10:20:00",
  "status": 409,
  "error": "Conflict",
  "message": "Owner has 2 pet(s) and cannot be deleted",
  "path": "/api/owners/12",
  "fieldErrors": []
}
```

> If the owner has no pets, deletion succeeds with `204 No Content`. Pets are never cascade-deleted or auto-archived as a side effect.

### 5.3 Pets

| Method | Path | Roles | Description |
|---|---|---|---|
| GET | `/api/pets` | ADMIN, VET, RECEPTIONIST | List pets (search, filter, sort, pagination) |
| POST | `/api/pets` | ADMIN, RECEPTIONIST | Create pet |
| GET | `/api/pets/{id}` | ADMIN, VET, RECEPTIONIST | Pet detail |
| PUT | `/api/pets/{id}` | ADMIN, RECEPTIONIST | Update pet |
| PATCH | `/api/pets/{id}/archive` | ADMIN, RECEPTIONIST | Archive pet (soft delete) |
| PATCH | `/api/pets/{id}/activate` | ADMIN, RECEPTIONIST | Reactivate pet |
| GET | `/api/pets/{id}/visits` | ADMIN, VET, RECEPTIONIST | Pet's visit history |
| GET | `/api/pets/{id}/vaccinations` | ADMIN, VET, RECEPTIONIST | Pet's vaccination history |
| GET | `/api/pets/{id}/weight-records` | ADMIN, VET, RECEPTIONIST | Pet's weight history |
| POST | `/api/pets/{id}/weight-records` | ADMIN, VET, RECEPTIONIST | Add a weight record (weighing can happen at check-in) |

> `GET /api/pets/{id}/weight-records` intentionally returns a plain array, not `PageResponse` — a single pet's weight history is a small, bounded list, so pagination metadata would add no value. Sort is fixed ascending by `recordedAt`.

**POST /api/pets — request**
```json
{
  "ownerId": 12,
  "name": "Boncuk",
  "species": "DOG",
  "breed": "Golden Retriever",
  "speciesNote": null,
  "birthDate": "2022-03-15",
  "sex": "FEMALE",
  "weightKg": 24.5,
  "allergies": "Penicillin",
  "chronicConditions": null
}
```

**POST /api/pets — response**
```json
{
  "id": 45,
  "ownerId": 12,
  "name": "Boncuk",
  "species": "DOG",
  "breed": "Golden Retriever",
  "speciesNote": null,
  "birthDate": "2022-03-15",
  "sex": "FEMALE",
  "weightKg": 24.5,
  "allergies": "Penicillin",
  "chronicConditions": null,
  "archived": false,
  "inactive": false,
  "createdAt": "2026-07-04T10:05:00",
  "updatedAt": "2026-07-04T10:05:00"
}
```

> Note: if `species` is not `CAT` or `DOG`, `breed` is not required and `speciesNote` should be provided instead (see `docs/business-rules.md`).

> `inactive` is a derived, read-only field (see `docs/business-rules.md` §6): `true` when the pet's most recent non-`CANCELLED` visit (or `createdAt` if it has none) is more than 2 years ago. It is present on every `PetResponse` (create/update/get/list/archive/activate) and is independent of `archived`, which is the explicit soft-delete flag.

### 5.4 Vets

| Method | Path | Roles | Description |
|---|---|---|---|
| GET | `/api/vets` | ADMIN, VET, RECEPTIONIST | List vets |
| POST | `/api/vets` | ADMIN | Create vet |
| GET | `/api/vets/{id}` | ADMIN, VET, RECEPTIONIST | Vet detail |
| PUT | `/api/vets/{id}` | ADMIN | Update vet |
| GET | `/api/vets/{id}/schedule` | ADMIN, VET, RECEPTIONIST | Vet's schedule |
| GET | `/api/vets/{id}/performance` | ADMIN | Vet performance metrics |

### 5.5 Visits

| Method | Path | Roles | Description |
|---|---|---|---|
| GET | `/api/visits` | ADMIN, VET, RECEPTIONIST | List visits (filter by vet/date range/status) |
| POST | `/api/visits` | ADMIN, RECEPTIONIST | Create visit/appointment |
| GET | `/api/visits/{id}` | ADMIN, VET, RECEPTIONIST | Visit detail |
| PUT | `/api/visits/{id}` | ADMIN, RECEPTIONIST | Update visit |
| PATCH | `/api/visits/{id}/status` | ADMIN, VET, RECEPTIONIST | Update visit status |
| PATCH | `/api/visits/{id}/medical-notes` | ADMIN, VET | Update diagnosis/treatment notes |
| GET | `/api/visits/calendar` | ADMIN, VET, RECEPTIONIST | Calendar view data |
| POST | `/api/visits/{id}/follow-up` | ADMIN, VET | Create/suggest follow-up visit |

> `GET /api/visits/calendar` intentionally returns a plain array, not `PageResponse` — it's meant to be called with a bounded `from`/`to` range for a calendar view, not browsed page by page. Sort is fixed ascending by `scheduledAt`.

**POST /api/visits — request**
```json
{
  "petId": 45,
  "vetId": 3,
  "scheduledAt": "2026-07-04T14:30:00",
  "chiefComplaint": "Limping on front left leg"
}
```

**PATCH /api/visits/{id}/status — request**
```json
{
  "status": "CHECKED_IN"
}
```

**PATCH /api/visits/{id}/medical-notes — request** (ADMIN/VET only)
```json
{
  "diagnosis": "Mild sprain",
  "treatmentNotes": "Rest for 1 week, anti-inflammatory prescribed",
  "followUpDate": "2026-07-11"
}
```

**PATCH /api/visits/{id}/medical-notes — response**
```json
{
  "id": 201,
  "petId": 45,
  "vetId": 3,
  "scheduledAt": "2026-07-04T14:30:00",
  "status": "COMPLETED",
  "chiefComplaint": "Limping on front left leg",
  "diagnosis": "Ear infection",
  "treatmentNotes": "Prescribed Penicillin for 7 days",
  "followUpDate": "2026-07-11",
  "warnings": ["Pet is recorded as allergic to Penicillin"],
  "createdAt": "2026-07-04T14:30:00",
  "updatedAt": "2026-07-04T15:10:00"
}
```

> `warnings` is a derived, non-blocking field (see `docs/business-rules.md` §7): the backend does a case-insensitive substring match of each comma/semicolon-separated token in `Pet.allergies` against `treatmentNotes`. It is present on every `VisitResponse` (create/update/get/list/calendar), not only the medical-notes endpoint, and is empty when there is no match or no `allergies`/`treatmentNotes` text to compare. There is no structured `Drug` catalog in this phase — see `decisions.md` for the confirmed assumption.

**POST /api/visits/{id}/follow-up — request**

No request body. `{id}` must reference a `COMPLETED` visit with a non-null `followUpDate`, otherwise `409 Conflict`.

**POST /api/visits/{id}/follow-up — response** (`201 Created`)
```json
{
  "id": 260,
  "petId": 45,
  "vetId": 3,
  "scheduledAt": "2026-07-11T09:00:00",
  "status": "SCHEDULED",
  "chiefComplaint": "Follow-up visit",
  "diagnosis": null,
  "treatmentNotes": null,
  "followUpDate": null,
  "warnings": [],
  "createdAt": "2026-07-04T15:10:00",
  "updatedAt": "2026-07-04T15:10:00"
}
```

> Creates a new `SCHEDULED` visit for the same pet/vet at `followUpDate` 09:00 (fixed default time — the request carries no `scheduledAt`, see `decisions.md`). Subject to the same ±15-minute vet overlap rule as any other visit (`409 Conflict` if the slot is taken); the frontend should fall back to the regular "New Visit" flow to pick a different time in that case.

### 5.6 Vaccinations

| Method | Path | Roles | Description |
|---|---|---|---|
| GET | `/api/vaccinations` | ADMIN, VET, RECEPTIONIST | List vaccinations |
| POST | `/api/vaccinations` | ADMIN, VET | Create vaccination record |
| GET | `/api/vaccinations/{id}` | ADMIN, VET, RECEPTIONIST | Vaccination detail |
| PUT | `/api/vaccinations/{id}` | ADMIN, VET | Update vaccination |
| DELETE | `/api/vaccinations/{id}` | ADMIN | Delete vaccination |

**POST /api/vaccinations — request**
```json
{
  "petId": 45,
  "vaccineType": "ONE_YEAR",
  "administeredAt": "2026-07-04T09:00:00",
  "lotNumber": "LOT-2026-778",
  "administeredBy": "Dr. Ahmet Kaya"
}
```

**POST /api/vaccinations — response**
```json
{
  "id": 88,
  "petId": 45,
  "vaccineType": "ONE_YEAR",
  "administeredAt": "2026-07-04T09:00:00",
  "lotNumber": "LOT-2026-778",
  "nextDueDate": "2027-07-04",
  "administeredBy": "Dr. Ahmet Kaya",
  "createdAt": "2026-07-04T09:00:00",
  "updatedAt": "2026-07-04T09:00:00"
}
```

> `nextDueDate` is calculated by the backend, never accepted from the client: `+3 years` for a three-year type, `+1 year` (default) otherwise. `ONE_YEAR`/`THREE_YEAR` above are generic demo type identifiers (see `docs/business-rules.md` §3 and `decisions.md`) — the source spec does not name real vaccines.

> `RECEPTIONIST` cannot create/update/delete vaccinations — read-only access only (see `docs/business-rules.md`).

### 5.7 Invoices

| Method | Path | Roles | Description |
|---|---|---|---|
| GET | `/api/invoices` | ADMIN, VET, RECEPTIONIST | List invoices (filter by status/date range) |
| POST | `/api/invoices` | ADMIN, RECEPTIONIST | Create invoice from visit |
| GET | `/api/invoices/{id}` | ADMIN, VET, RECEPTIONIST | Invoice detail |
| PATCH | `/api/invoices/{id}/send` | ADMIN, RECEPTIONIST | Mark invoice as sent |
| PATCH | `/api/invoices/{id}/mark-paid` | ADMIN, RECEPTIONIST | Mark invoice as paid |
| PATCH | `/api/invoices/bulk-mark-paid` | ADMIN, RECEPTIONIST | Bulk mark invoices as paid |

**POST /api/invoices — request**
```json
{
  "visitId": 201,
  "items": [
    { "description": "Consultation", "category": "CONSULTATION", "quantity": 1, "unitPrice": 500.00 },
    { "description": "Rabies vaccine", "category": "VACCINATION", "quantity": 1, "unitPrice": 300.00 }
  ]
}
```

**POST /api/invoices — response**
```json
{
  "id": 501,
  "visitId": 201,
  "issuedAt": "2026-07-04T15:00:00",
  "subtotal": 800.00,
  "vatRate": 0.18,
  "vatAmount": 144.00,
  "total": 944.00,
  "status": "DRAFT",
  "items": [
    { "id": 1, "description": "Consultation", "category": "CONSULTATION", "quantity": 1, "unitPrice": 500.00, "lineTotal": 500.00 },
    { "id": 2, "description": "Rabies vaccine", "category": "VACCINATION", "quantity": 1, "unitPrice": 300.00, "lineTotal": 300.00 }
  ],
  "createdAt": "2026-07-04T15:00:00",
  "updatedAt": "2026-07-04T15:00:00"
}
```

> `subtotal`, `vatAmount`, and `total` are always calculated server-side. Client-submitted totals are ignored.

**PATCH /api/invoices/bulk-mark-paid — request**
```json
{
  "invoiceIds": [501, 502, 503]
}
```

### 5.8 Dashboard

| Method | Path | Roles | Description |
|---|---|---|---|
| GET | `/api/dashboard/summary` | ADMIN, VET, RECEPTIONIST | Dashboard KPIs + chart data |

**GET /api/dashboard/summary — response**
```json
{
  "todayAppointments": 8,
  "activePatients": 142,
  "pendingVaccinations": 5,
  "unpaidInvoices": 3,
  "monthlyRevenue": [
    { "month": "2026-01", "revenue": 45000.00 },
    { "month": "2026-02", "revenue": 52000.00 }
  ],
  "revenueByCategory": [
    { "category": "CONSULTATION", "amount": 20000.00 },
    { "category": "VACCINATION", "amount": 8000.00 },
    { "category": "SURGERY", "amount": 15000.00 },
    { "category": "HOSPITAL", "amount": 4000.00 },
    { "category": "OTHER", "amount": 1000.00 }
  ],
  "appointmentTrend30Days": [
    { "date": "2026-06-05", "count": 6 },
    { "date": "2026-06-06", "count": 9 }
  ],
  "cumulativeAppointmentsYtd": [
    { "date": "2026-01-31", "cumulativeCount": 120 },
    { "date": "2026-02-28", "cumulativeCount": 260 }
  ],
  "appointmentsByVet": [
    { "vetId": 1, "vetName": "Dr. Ahmet Kaya", "count": 40 },
    { "vetId": 2, "vetName": "Dr. Zeynep Arslan", "count": 35 }
  ],
  "todaySchedule": [
    { "visitId": 300, "petName": "Boncuk", "vetName": "Dr. Ahmet Kaya", "scheduledAt": "2026-07-04T14:30:00", "status": "SCHEDULED" }
  ],
  "upcomingVaccinationAlerts": [
    { "petId": 45, "petName": "Boncuk", "vaccineType": "Rabies", "nextDueDate": "2026-07-20" }
  ],
  "overdueFollowUpAlerts": [
    { "visitId": 250, "petName": "Minnoş", "followUpDate": "2026-06-28" }
  ]
}
```

## 6. Listing Query Parameters (convention)

- `page` (default 0), `size` (default 20), `sort` (e.g. `sort=name,asc`)
- `search` where applicable (e.g. owner/pet name)
- Resource-specific filters, e.g.:
  - Pets: `species`, `ownerId`, `active`
  - Visits: `vetId`, `from`, `to`, `status`
  - Invoices: `status`, `from`, `to`
