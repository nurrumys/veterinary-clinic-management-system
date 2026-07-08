package com.efe.veterinaryclinic.vet;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class VetControllerTest {

    @Value("${app.seed.admin.email}")
    private String SEED_ADMIN_EMAIL;
    @Value("${app.seed.admin.password}")
    private String SEED_ADMIN_PASSWORD;
    @Value("${app.seed.receptionist.email}")
    private String SEED_RECEPTIONIST_EMAIL;
    @Value("${app.seed.receptionist.password}")
    private String SEED_RECEPTIONIST_PASSWORD;

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

    private record LoginPayload(String email, String password) {
    }
}
