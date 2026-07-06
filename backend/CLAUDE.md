# CLAUDE.md

This file gives Claude Code the persistent context and rules needed to work on this repository. Follow it exactly. If a request conflicts with this file, flag the conflict instead of silently picking one side.

## Project Context

This repository is the real Spring Boot backend API for a Veterinary Clinic Management System.

The original assignment was a React frontend learning assignment, where the backend was expected to be mocked (MSW or JSON Server). In this repository, we are instead building the real backend API that the React frontend will consume. Every backend decision should be traceable to a frontend page or flow described in `docs/backend-spec.md`.

Full requirements live in:
- `docs/backend-spec.md` — persona, entities, relationships, modules, final demo flow
- `docs/api-contract.md` — endpoint list, request/response examples, pagination/error format
- `docs/business-rules.md` — detailed business rules
- `docs/implementation-tasks.md` — step-by-step task checklist
- `decisions.md` — architectural decisions log

## Persona / Usage Profile

- Used by one clinic receptionist and two veterinarians.
- Primary device: desktop Chrome. Must also work on tablet.
- Volume: ~30 appointments/day, ~50 patient files opened/updated per day.
- Receptionist: creates/updates owners and pets, schedules visits, issues invoices.
- Vets: manage examination, diagnosis, treatment notes, vaccination, follow-up planning.

## Tech Stack

- Java 17
- Spring Boot 3
- Spring Web, Spring Data JPA, Spring Security
- JWT authentication
- PostgreSQL (development), H2 (tests)
- Bean Validation
- springdoc-openapi / Swagger
- JUnit / Spring Boot Test
- Maven

## Roles

- `ADMIN` — can manage most resources.
- `VET` — can edit medical data: diagnosis, treatment notes, follow-up data.
- `RECEPTIONIST` — creates owners, pets, visits, invoices; **cannot** edit treatment notes.

## Modules

`auth`, `owner`, `pet`, `vet`, `visit`, `vaccination`, `invoice`, `dashboard`, `common`, `security`, `config`.

## Architecture Rules

- Layered architecture: controller → service → repository.
- Packages organized by module (not by technical layer at the top level).
- Each module may contain: controller, service, repository, entity, dto, mapper.
- Controllers only handle HTTP request/response — no business logic in controllers.
- Services contain all business logic.
- Repositories only access the database.
- Never expose JPA entities directly from controllers — always use request/response DTOs.
- Use Bean Validation on request DTOs.
- Use a `GlobalExceptionHandler` for a consistent error response shape.
- Document the API with Swagger/OpenAPI.
- All endpoints are prefixed with `/api`.
- Follow REST conventions.

## DTO / Pagination / Error Standards

- Every listing endpoint returns the standard `PageResponse` shape: `content`, `page`, `size`, `totalElements`, `totalPages`, `last`.
- Every error response follows the standard shape documented in `docs/api-contract.md` (`timestamp`, `status`, `error`, `message`, `path`, `fieldErrors`).
- Dates: `LocalDate` for date-only fields. Times: `LocalDateTime` for `scheduledAt`, `issuedAt`, `administeredAt`, `createdAt`, `updatedAt`. All serialized as ISO-8601 strings.

## Security Rules

- JWT-based login, `Authorization: Bearer <token>` header.
- Passwords are hashed, never stored or logged in plain text.
- First-phase auth endpoints only: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`.
- Do not implement refresh tokens in the first phase.
- Do not implement forgot-password in the first phase.

## Key Business Rules (see `docs/business-rules.md` for full detail)

1. Same vet cannot have overlapping appointments within ±15 minutes.
2. Pets are never hard-deleted — use archive/activate instead.
3. Vaccination `nextDueDate` is calculated by the backend.
4. Invoice `subtotal`, VAT (18%), `vatAmount`, and `total` are calculated by the backend — the frontend is never trusted for totals.
5. RECEPTIONIST cannot edit treatment notes; VET and ADMIN can.
6. A pet with no visits for more than 2 years is treated as inactive.
7. If a selected drug conflicts with a pet's recorded allergies, the backend returns a warning.
8. If species is not CAT or DOG, breed is not required and `speciesNote` is used instead.
9. When a visit is completed and `followUpDate` is set, the backend supports follow-up creation/suggestion.
10. Age-based vaccination expectations (documented, not necessarily hard-enforced): pets over 1 year — annual rabies vaccine expected; pets under 1 year — puppy/kitten series warning around 6, 8, and 12 weeks.

## Development Workflow

- Work in small increments; do not implement the whole backend in one pass.
- Before any non-trivial implementation step, propose a short plan and wait for approval.
- Only read the files needed for the current task — do not scan the whole repository by default.
- Do not read or edit `target/`, `.idea/`, build output, logs, or other generated files.
- When editing an existing file, read it first — never blind-overwrite.
- Keep all code, class/method names, docs, and this file in English.
- Conversational explanations to the user are in Turkish.

## Do-Not Rules

- Do not expose JPA entities in API responses.
- Do not put business rules in controllers.
- Do not hard-delete pets (or other soft-deletable resources) — use archive/activate.
- Do not trust frontend-submitted totals for invoices.
- Do not let RECEPTIONIST-role requests modify treatment notes.
- Do not implement refresh tokens or forgot-password in the first phase.
- Do not add features, abstractions, or endpoints beyond what `docs/backend-spec.md` and `docs/api-contract.md` describe without discussing it first.
