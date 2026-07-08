# veterinary-clinic-management-system
A full-stack Veterinary Clinic Management System built with React, Spring Boot and PostgreSQL.

## Backend quick start for frontend developers (no PostgreSQL needed)

Run the backend against an in-memory H2 database — no local database setup required:

```
cd backend
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=h2
```

- Swagger UI: http://localhost:8080/swagger-ui/index.html
- H2 console: http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:vet_clinic_h2`, user `sa`, empty password)
- Login endpoint: `POST http://localhost:8080/api/auth/login`

Seed accounts (ready out of the box in the `h2` profile):

| Role | Email | Password |
|---|---|---|
| ADMIN | h2-admin@example.com | H2Demo-Admin-2026! |
| VET | h2-vet1@example.com | H2Demo-Vet1-2026! |
| VET | h2-vet2@example.com | H2Demo-Vet2-2026! |
| RECEPTIONIST | h2-receptionist@example.com | H2Demo-Reception-2026! |

These `h2` profile accounts are separate from (and unrelated to) the seed accounts used in the real PostgreSQL dev/test setup.
