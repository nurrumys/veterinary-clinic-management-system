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
| ADMIN | admin@clinic.com | Admin123! |
| VET | vet1@clinic.com | Vet12345! |
| VET | vet2@clinic.com | Vet22345! |
| RECEPTIONIST | receptionist@clinic.com | Reception123! |
