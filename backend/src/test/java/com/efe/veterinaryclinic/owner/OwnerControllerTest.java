package com.efe.veterinaryclinic.owner;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class OwnerControllerTest {

    private static final String SEED_ADMIN_EMAIL = "admin@clinic.com";
    private static final String SEED_ADMIN_PASSWORD = "Admin123!";
    private static final String SEED_RECEPTIONIST_EMAIL = "receptionist@clinic.com";
    private static final String SEED_RECEPTIONIST_PASSWORD = "Reception123!";
    private static final String SEED_VET1_EMAIL = "vet1@clinic.com";
    private static final String SEED_VET1_PASSWORD = "Vet12345!";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void receptionistCreatesOwnerThenOwnerAppearsInList() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        String createBody = objectMapper.writeValueAsString(
                new OwnerPayload("Mehmet", "Demir", "+90 555 123 4567", "mehmet.demir@example.com", "Istanbul, Turkey"));

        mockMvc.perform(post("/api/owners")
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName").value("Mehmet"))
                .andExpect(jsonPath("$.lastName").value("Demir"))
                .andExpect(jsonPath("$.petCount").value(0))
                .andExpect(jsonPath("$.id").exists());

        mockMvc.perform(get("/api/owners").header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements").exists());
    }

    @Test
    void createOwnerByVetIsForbidden() throws Exception {
        String vetToken = loginAndGetToken(SEED_VET1_EMAIL, SEED_VET1_PASSWORD);
        String createBody = objectMapper.writeValueAsString(
                new OwnerPayload("Ayse", "Yilmaz", "+90 555 000 0000", "ayse.yilmaz@example.com", "Ankara, Turkey"));

        mockMvc.perform(post("/api/owners")
                        .header("Authorization", "Bearer " + vetToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isForbidden());
    }

    @Test
    void createOwnerWithBlankFirstNameReturnsValidationError() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        String createBody = objectMapper.writeValueAsString(
                new OwnerPayload("", "Demir", "+90 555 123 4567", "mehmet.demir2@example.com", "Istanbul, Turkey"));

        mockMvc.perform(post("/api/owners")
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("firstName"));
    }

    @Test
    void receptionistUpdatesOwnerFields() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long ownerId = createOwner(receptionistToken, "before-update@example.com");

        String updateBody = objectMapper.writeValueAsString(
                new OwnerPayload("Mehmet", "Demir-Updated", "+90 555 999 9999", "after-update@example.com", "Ankara, Turkey"));

        mockMvc.perform(put("/api/owners/" + ownerId)
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lastName").value("Demir-Updated"))
                .andExpect(jsonPath("$.email").value("after-update@example.com"));

        // Separate, later request: proves the update was actually written to the DB,
        // not just mutated on the in-memory object returned by the PUT call above.
        mockMvc.perform(get("/api/owners/" + ownerId).header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lastName").value("Demir-Updated"))
                .andExpect(jsonPath("$.email").value("after-update@example.com"));
    }

    @Test
    void updateUnknownOwnerReturnsNotFound() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        String updateBody = objectMapper.writeValueAsString(
                new OwnerPayload("Mehmet", "Demir", "+90 555 123 4567", "unknown-owner@example.com", "Istanbul, Turkey"));

        mockMvc.perform(put("/api/owners/999999")
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateBody))
                .andExpect(status().isNotFound());
    }

    @Test
    void adminDeletesOwnerWithNoPets() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        long ownerId = createOwner(adminToken, "no-pets-owner@example.com");

        mockMvc.perform(delete("/api/owners/" + ownerId)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isNoContent());
    }

    @Test
    void deleteOwnerWithPetsReturnsConflict() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        long ownerId = createOwner(adminToken, "owner-with-pet@example.com");

        String petBody = objectMapper.writeValueAsString(
                new PetPayload(ownerId, "Boncuk", "DOG", "Golden Retriever", null,
                        "2022-03-15", "FEMALE", 24.5, null, null));
        mockMvc.perform(post("/api/pets")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(petBody))
                .andExpect(status().isCreated());

        mockMvc.perform(delete("/api/owners/" + ownerId)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value("Owner has 1 pet(s) and cannot be deleted"));
    }

    @Test
    void deleteOwnerByReceptionistIsForbidden() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long ownerId = createOwner(receptionistToken, "forbidden-delete-owner@example.com");

        mockMvc.perform(delete("/api/owners/" + ownerId)
                        .header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isForbidden());
    }

    @Test
    void getOwnerDetailIncludesPetsAndCount() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        long ownerId = createOwner(adminToken, "owner-detail@example.com");

        String petBody = objectMapper.writeValueAsString(
                new PetPayload(ownerId, "Boncuk", "DOG", "Golden Retriever", null,
                        "2022-03-15", "FEMALE", 24.5, null, null));
        mockMvc.perform(post("/api/pets")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(petBody))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/owners/" + ownerId)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(ownerId))
                .andExpect(jsonPath("$.petCount").value(1))
                .andExpect(jsonPath("$.pets[0].name").value("Boncuk"));
    }

    @Test
    void getUnknownOwnerDetailReturnsNotFound() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);

        mockMvc.perform(get("/api/owners/999999")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isNotFound());
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

    private String loginAndGetToken(String email, String password) throws Exception {
        String loginBody = objectMapper.writeValueAsString(new LoginPayload(email, password));

        String response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBody))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        return objectMapper.readTree(response).get("token").asText();
    }

    private record OwnerPayload(String firstName, String lastName, String phone, String email, String address) {
    }

    private record PetPayload(Long ownerId, String name, String species, String breed, String speciesNote,
                               String birthDate, String sex, Double weightKg, String allergies,
                               String chronicConditions) {
    }

    private record LoginPayload(String email, String password) {
    }
}
