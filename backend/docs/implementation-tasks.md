# Implementation Tasks — Veterinary Clinic Management System

This is the step-by-step checklist used to guide small, incremental Claude Code sessions. Each task lists what to implement, which files/packages it may touch, and what command to run afterward to verify. Work through tasks in order; do not jump ahead. Each task should be its own small session/commit where possible.

Verification commands referenced below:
- `./mvnw compile` — compiles the project.
- `./mvnw test` — runs the test suite (uses H2, per `src/test/resources/application.properties`).
- `./mvnw spring-boot:run` — runs the app locally against PostgreSQL.

---

## Week 1 — Foundations

1. **Add missing dependencies**
   - Add `springdoc-openapi-starter-webmvc-ui` and a JWT library (e.g. `io.jsonwebtoken:jjwt-api` + `jjwt-impl` + `jjwt-jackson`) to `pom.xml`.
   - Files: `pom.xml`.
   - Verify: `./mvnw compile`.

2. **Swagger/OpenAPI setup**
   - Add minimal OpenAPI config (title, description, security scheme for Bearer JWT).
   - Files: `config/OpenApiConfig.java`.
   - Verify: `./mvnw spring-boot:run`, check `/swagger-ui.html`.

3. **CORS configuration**
   - Allow the frontend dev origin(s) for local development.
   - Files: `config/CorsConfig.java` (or within security config).
   - Verify: `./mvnw compile`.

4. **Package structure**
   - Create empty module packages: `auth`, `owner`, `pet`, `vet`, `visit`, `vaccination`, `invoice`, `dashboard`, `common`, `security`, `config`.
   - Verify: `./mvnw compile`.

5. **Global error handling**
   - `GlobalExceptionHandler` producing the standard error shape from `docs/api-contract.md`.
   - Files: `common/exception/GlobalExceptionHandler.java`, `common/exception/*Exception.java`.
   - Verify: `./mvnw test`.

6. **DTO / PageResponse standard**
   - Generic `PageResponse<T>` DTO used by all listing endpoints.
   - Files: `common/dto/PageResponse.java`.
   - Verify: `./mvnw compile`.

7. **User/Role entity + JWT auth**
   - `User` entity, `Role` enum, password hashing, JWT issuing/validation, Spring Security config.
   - Files: `security/*`, `auth/*`.
   - Verify: `./mvnw test`.

8. **Auth endpoints**
   - `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`.
   - Files: `auth/AuthController.java`, `auth/AuthService.java`, `auth/dto/*`.
   - Verify: `./mvnw test`, manual login via Swagger.

9. **Seed users**
   - Data seeding for at least one ADMIN, one VET, one RECEPTIONIST for local/demo use.
   - Files: `config/DataSeeder.java` (or `CommandLineRunner`).
   - Verify: `./mvnw spring-boot:run`, confirm login works for seeded users.

10. **Owner CRUD (start)**
    - `Owner` entity, repository, basic create/list.
    - Files: `owner/*`.
    - Verify: `./mvnw test`.

11. **Pet/Vet CRUD (start)**
    - `Pet`, `Vet` entities, repositories, basic create/list.
    - Files: `pet/*`, `vet/*`.
    - Verify: `./mvnw test`.

---

## Week 2 — Core CRUD + Visits

12. **Complete Owner CRUD**
    - Full CRUD + validation.
    - Files: `owner/*`.
    - Verify: `./mvnw test`.

13. **Owner detail with pet list/count**
    - `GET /api/owners/{id}` includes pets and pet count.
    - Files: `owner/*`.
    - Verify: `./mvnw test`.

14. **Complete Pet CRUD**
    - Full CRUD + species/breed conditional validation rule.
    - Files: `pet/*`.
    - Verify: `./mvnw test`.

15. **Pet archive/activate**
    - `PATCH /api/pets/{id}/archive`, `PATCH /api/pets/{id}/activate`.
    - Files: `pet/*`.
    - Verify: `./mvnw test`.

16. **Pet search/filter/sort/pagination**
    - `GET /api/pets` with `search`, `species`, `ownerId`, `active`, sort, pagination.
    - Files: `pet/*`.
    - Verify: `./mvnw test`.

17. **Complete Vet CRUD**
    - Full CRUD.
    - Files: `vet/*`.
    - Verify: `./mvnw test`.

18. **Visit entity + status enum**
    - `Visit` entity, `VisitStatus` enum, repository.
    - Files: `visit/*`.
    - Verify: `./mvnw test`.

19. **Visit CRUD**
    - Create/read/update visits.
    - Files: `visit/*`.
    - Verify: `./mvnw test`.

20. **Visit status update endpoint**
    - `PATCH /api/visits/{id}/status`.
    - Files: `visit/*`.
    - Verify: `./mvnw test`.

21. **Visit filter + calendar endpoint**
    - `GET /api/visits` with vet/date-range/status filters; `GET /api/visits/calendar`.
    - Files: `visit/*`.
    - Verify: `./mvnw test`.

22. **Appointment overlap rule**
    - ±15 minute same-vet overlap check (see `docs/business-rules.md` §1).
    - Files: `visit/VisitService.java`.
    - Verify: `./mvnw test` (add overlap test case).

23. **Pet visit history endpoint**
    - `GET /api/pets/{id}/visits`.
    - Files: `pet/*`, `visit/*`.
    - Verify: `./mvnw test`.

---

## Week 3 — Vaccinations, Weight, Invoices, Treatment Notes

24. **Vaccination entity + CRUD**
    - `Vaccination` entity, full CRUD.
    - Files: `vaccination/*`.
    - Verify: `./mvnw test`.

25. **Vaccination nextDueDate rule**
    - Server-side calculation (see `docs/business-rules.md` §3).
    - Files: `vaccination/VaccinationService.java`.
    - Verify: `./mvnw test`.

26. **Pet vaccination history + age-based warnings**
    - `GET /api/pets/{id}/vaccinations`; document/support age-based vaccine warning data (§10 in business rules).
    - Files: `pet/*`, `vaccination/*`.
    - Verify: `./mvnw test`.

27. **PetWeightRecord entity + endpoints**
    - `GET/POST /api/pets/{id}/weight-records`.
    - Files: `pet/*` (or a `weight` sub-package).
    - Verify: `./mvnw test`.

28. **Invoice + InvoiceItem entities**
    - Entities, `InvoiceStatus` and `InvoiceItemCategory` enums.
    - Files: `invoice/*`.
    - Verify: `./mvnw test`.

29. **Invoice create + subtotal/VAT/total calculation**
    - `POST /api/invoices` with server-side calculation (see `docs/business-rules.md` §4).
    - Files: `invoice/InvoiceService.java`.
    - Verify: `./mvnw test` (add calculation test cases).

30. **Invoice listing/filtering**
    - `GET /api/invoices` with status/date-range filters.
    - Files: `invoice/*`.
    - Verify: `./mvnw test`.

31. **Invoice send/mark-paid/bulk-paid**
    - `PATCH /api/invoices/{id}/send`, `PATCH /api/invoices/{id}/mark-paid`, `PATCH /api/invoices/bulk-mark-paid`.
    - Files: `invoice/*`.
    - Verify: `./mvnw test`.

32. **Treatment notes update + role rule**
    - `PATCH /api/visits/{id}/medical-notes`, RECEPTIONIST forbidden (see `docs/business-rules.md` §5).
    - Files: `visit/*`, `security/*`.
    - Verify: `./mvnw test` (add a test asserting RECEPTIONIST gets 403).

33. **Allergy warning infrastructure**
    - Non-blocking warning when treatment references a drug conflicting with `Pet.allergies` (see `docs/business-rules.md` §7).
    - Files: `visit/*` or a new `common`/`treatment` helper.
    - Verify: `./mvnw test`.

---

## Week 4 — Dashboard, Polish, Demo Readiness

34. **Dashboard summary DTO + KPI queries**
    - `todayAppointments`, `activePatients`, `pendingVaccinations`, `unpaidInvoices`.
    - Files: `dashboard/*`.
    - Verify: `./mvnw test`.

35. **Monthly revenue + revenue category chart data**
    - Files: `dashboard/*`.
    - Verify: `./mvnw test`.

36. **30-day appointment trend + cumulative appointments YTD**
    - Files: `dashboard/*`.
    - Verify: `./mvnw test`.

37. **Vet-by-vet appointment count**
    - Files: `dashboard/*`.
    - Verify: `./mvnw test`.

38. **Today schedule + alerts (vaccination, overdue follow-up)**
    - Files: `dashboard/*`.
    - Verify: `./mvnw test`.

39. **Dashboard endpoint assembly**
    - `GET /api/dashboard/summary` wiring all of the above.
    - Files: `dashboard/DashboardController.java`.
    - Verify: `./mvnw test`, manual check via Swagger.

40. **Vet performance endpoint**
    - `GET /api/vets/{id}/performance`.
    - Files: `vet/*`.
    - Verify: `./mvnw test`.

41. **Follow-up endpoint**
    - `POST /api/visits/{id}/follow-up` (see `docs/business-rules.md` §9).
    - Files: `visit/*`.
    - Verify: `./mvnw test`.

42. **Inactive pet logic**
    - Computed `inactive` flag (>2 years without a visit) (see `docs/business-rules.md` §6).
    - Files: `pet/*`.
    - Verify: `./mvnw test`.

43. **Final search/filter cleanup**
    - Review all listing endpoints for consistent query params and `PageResponse` usage.
    - Files: across modules.
    - Verify: `./mvnw test`.

44. **Swagger cleanup**
    - Ensure all endpoints have descriptions, examples, and correct security annotations.
    - Files: across modules, `config/OpenApiConfig.java`.
    - Verify: manual check via `/swagger-ui.html`.

45. **Seed demo data**
    - Realistic demo dataset covering the full acceptance flow (owners, pets, vets, visits, vaccinations, invoices).
    - Files: `config/DataSeeder.java`.
    - Verify: `./mvnw spring-boot:run`, manually walk the demo flow.

46. **Tests pass**
    - Full suite green.
    - Verify: `./mvnw test`.

47. **README**
    - Setup instructions, env vars, how to run, how to seed data.
    - Files: `README.md`.
    - Verify: manual read-through.

48. **Frontend integration fixes**
    - Address any contract mismatches found while wiring up the real frontend.
    - Files: as needed, cross-referencing `docs/api-contract.md`.
    - Verify: `./mvnw test`, manual frontend smoke test.

49. **Final demo flow validation**
    - Walk through the full acceptance flow in `docs/backend-spec.md` §15 end-to-end.
    - Verify: manual run through Swagger or the real frontend, no build errors.
