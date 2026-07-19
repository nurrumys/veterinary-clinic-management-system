package com.efe.veterinaryclinic.vet;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class VetControllerTest {

    private static final DateTimeFormatter ISO = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    @Value("${app.seed.admin.email}")
    private String SEED_ADMIN_EMAIL;
    @Value("${app.seed.admin.password}")
    private String SEED_ADMIN_PASSWORD;
    @Value("${app.seed.receptionist.email}")
    private String SEED_RECEPTIONIST_EMAIL;
    @Value("${app.seed.receptionist.password}")
    private String SEED_RECEPTIONIST_PASSWORD;
    @Value("${app.seed.vet1.email}")
    private String SEED_VET1_EMAIL;
    @Value("${app.seed.vet1.password}")
    private String SEED_VET1_PASSWORD;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void adminCreatesVetThenVetAppearsInList() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        String createBody = objectMapper.writeValueAsString(
                new VetPayload("Dr. Zeynep Kaya", "Surgery", "VET-LIC-001", "Mon-Fri 09:00-17:00"));

        mockMvc.perform(post("/api/vets")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Dr. Zeynep Kaya"))
                .andExpect(jsonPath("$.active").value(true));

        mockMvc.perform(get("/api/vets").header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray());
    }

    @Test
    void createVetByReceptionistIsForbidden() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        String createBody = objectMapper.writeValueAsString(
                new VetPayload("Dr. Someone", "Dermatology", "VET-LIC-002", "Mon-Fri 09:00-17:00"));

        mockMvc.perform(post("/api/vets")
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isForbidden());
    }

    @Test
    void createVetWithDuplicateLicenseNoReturnsConflict() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        createVet(adminToken, "Dr. First", "VET-LIC-DUP");

        String duplicateBody = objectMapper.writeValueAsString(
                new VetPayload("Dr. Second", "Cardiology", "VET-LIC-DUP", "Mon-Fri 09:00-17:00"));

        mockMvc.perform(post("/api/vets")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(duplicateBody))
                .andExpect(status().isConflict());
    }

    @Test
    void getVetByIdReturnsVet() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        long vetId = createVet(adminToken, "Dr. Detail", "VET-LIC-DETAIL");

        mockMvc.perform(get("/api/vets/" + vetId).header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(vetId))
                .andExpect(jsonPath("$.name").value("Dr. Detail"));
    }

    @Test
    void getUnknownVetReturnsNotFound() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);

        mockMvc.perform(get("/api/vets/999999").header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isNotFound());
    }

    @Test
    void adminUpdatesVetFields() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        long vetId = createVet(adminToken, "Dr. Before Update", "VET-LIC-UPDATE");

        String updateBody = objectMapper.writeValueAsString(
                new VetPayload("Dr. After Update", "Cardiology", "VET-LIC-UPDATE", "Mon-Sat 08:00-16:00"));

        mockMvc.perform(put("/api/vets/" + vetId)
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Dr. After Update"))
                .andExpect(jsonPath("$.specialty").value("Cardiology"));

        mockMvc.perform(get("/api/vets/" + vetId).header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Dr. After Update"));
    }

    @Test
    void updateVetByReceptionistIsForbidden() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long vetId = createVet(adminToken, "Dr. Protected", "VET-LIC-PROTECTED");

        String updateBody = objectMapper.writeValueAsString(
                new VetPayload("Dr. Hacked", "Cardiology", "VET-LIC-PROTECTED", "Mon-Fri 09:00-17:00"));

        mockMvc.perform(put("/api/vets/" + vetId)
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateBody))
                .andExpect(status().isForbidden());
    }

    @Test
    void updateUnknownVetReturnsNotFound() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        String updateBody = objectMapper.writeValueAsString(
                new VetPayload("Dr. Unknown", "Cardiology", "VET-LIC-UNKNOWN", "Mon-Fri 09:00-17:00"));

        mockMvc.perform(put("/api/vets/999999")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateBody))
                .andExpect(status().isNotFound());
    }

    @Test
    void adminGetsVetPerformanceWithVisitCountsAndPaidRevenue() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long vetId = createVet(adminToken, "Dr. Performance", "VET-LIC-PERF-001");
        long petId = createPet(receptionistToken, "vet-performance@example.com", "Coco");

        long completedVisitId = createVisit(receptionistToken, petId, vetId, LocalDateTime.now().minusDays(2).withHour(9).withMinute(0));
        updateVisitStatus(receptionistToken, completedVisitId, "COMPLETED");
        long cancelledVisitId = createVisit(receptionistToken, petId, vetId, LocalDateTime.now().minusDays(1).withHour(9).withMinute(0));
        updateVisitStatus(receptionistToken, cancelledVisitId, "CANCELLED");
        createVisit(receptionistToken, petId, vetId, LocalDateTime.now().plusDays(3).withHour(9).withMinute(0));

        String invoiceBody = objectMapper.writeValueAsString(new InvoicePayload(completedVisitId, List.of(
                new InvoiceItemPayload("Consultation", "CONSULTATION", 1, new BigDecimal("500.00")))));
        String invoiceResponse = mockMvc.perform(post("/api/invoices")
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invoiceBody))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        long invoiceId = objectMapper.readTree(invoiceResponse).get("id").asLong();
        mockMvc.perform(patch("/api/invoices/" + invoiceId + "/mark-paid")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/vets/" + vetId + "/performance").header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.vetId").value(vetId))
                .andExpect(jsonPath("$.totalVisitsYtd").value(2))
                .andExpect(jsonPath("$.completedVisitsYtd").value(1))
                .andExpect(jsonPath("$.cancelledVisitsYtd").value(1))
                .andExpect(jsonPath("$.upcomingVisits").value(1))
                // subtotal 500.00 + 18% VAT = 590.00 total
                .andExpect(jsonPath("$.revenueGeneratedYtd").value(590.00));
    }

    @Test
    void vetPerformanceByReceptionistIsForbidden() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long vetId = createVet(adminToken, "Dr. Restricted", "VET-LIC-PERF-002");

        mockMvc.perform(get("/api/vets/" + vetId + "/performance").header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isForbidden());
    }

    @Test
    void vetPerformanceByVetRoleIsForbidden() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        String vetToken = loginAndGetToken(SEED_VET1_EMAIL, SEED_VET1_PASSWORD);
        long vetId = createVet(adminToken, "Dr. AlsoRestricted", "VET-LIC-PERF-003");

        mockMvc.perform(get("/api/vets/" + vetId + "/performance").header("Authorization", "Bearer " + vetToken))
                .andExpect(status().isForbidden());
    }

    @Test
    void vetPerformanceForUnknownVetReturnsNotFound() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);

        mockMvc.perform(get("/api/vets/999999/performance").header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isNotFound());
    }

    private void updateVisitStatus(String token, long visitId, String status) throws Exception {
        mockMvc.perform(patch("/api/visits/" + visitId + "/status")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new StatusPayload(status))))
                .andExpect(status().isOk());
    }

    private long createVisit(String token, long petId, long vetId, LocalDateTime scheduledAt) throws Exception {
        String createBody = objectMapper.writeValueAsString(
                new VisitPayload(petId, vetId, scheduledAt.format(ISO), "Checkup"));

        String response = mockMvc.perform(post("/api/visits")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        return objectMapper.readTree(response).get("id").asLong();
    }

    private long createPet(String token, String ownerEmail, String petName) throws Exception {
        long ownerId = createOwner(token, ownerEmail);

        String petBody = objectMapper.writeValueAsString(
                new PetPayload(ownerId, petName, "DOG", "Golden Retriever", null,
                        "2022-03-15", "FEMALE", 24.5, null, null));

        String response = mockMvc.perform(post("/api/pets")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(petBody))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        return objectMapper.readTree(response).get("id").asLong();
    }

    private long createOwner(String token, String email) throws Exception {
        String ownerBody = objectMapper.writeValueAsString(
                new OwnerPayload("Mehmet", "Demir", "+90 555 123 4567", email, "Istanbul, Turkey"));

        String response = mockMvc.perform(post("/api/owners")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(ownerBody))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        return objectMapper.readTree(response).get("id").asLong();
    }

    private long createVet(String token, String name, String licenseNo) throws Exception {
        String createBody = objectMapper.writeValueAsString(
                new VetPayload(name, "Surgery", licenseNo, "Mon-Fri 09:00-17:00"));

        String response = mockMvc.perform(post("/api/vets")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        return objectMapper.readTree(response).get("id").asLong();
    }

    private String loginAndGetToken(String email, String password) throws Exception {
        String loginBody = objectMapper.writeValueAsString(new LoginPayload(email, password));

        String response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBody))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        return objectMapper.readTree(response).get("token").asText();
    }

    private record VetPayload(String name, String specialty, String licenseNo, String workHours) {
    }

    private record VisitPayload(Long petId, Long vetId, String scheduledAt, String chiefComplaint) {
    }

    private record StatusPayload(String status) {
    }

    private record InvoicePayload(Long visitId, List<InvoiceItemPayload> items) {
    }

    private record InvoiceItemPayload(String description, String category, Integer quantity, BigDecimal unitPrice) {
    }

    private record PetPayload(Long ownerId, String name, String species, String breed, String speciesNote,
                               String birthDate, String sex, Double weightKg, String allergies,
                               String chronicConditions) {
    }

    private record OwnerPayload(String firstName, String lastName, String phone, String email, String address) {
    }

    private record LoginPayload(String email, String password) {
    }
}
