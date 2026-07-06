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
