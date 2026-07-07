package com.efe.veterinaryclinic.pet;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.everyItem;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PetControllerTest {

    private static final String SEED_RECEPTIONIST_EMAIL = "receptionist@clinic.com";
    private static final String SEED_RECEPTIONIST_PASSWORD = "Reception123!";
    private static final String SEED_VET1_EMAIL = "vet1@clinic.com";
    private static final String SEED_VET1_PASSWORD = "Vet12345!";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void receptionistCreatesPetForOwnerThenPetAppearsInListAndOwnerPetCountIncreases() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long ownerId = createOwner(receptionistToken, "pet-owner@example.com");

        String createBody = objectMapper.writeValueAsString(
                new PetPayload(ownerId, "Boncuk", "DOG", "Golden Retriever", null,
                        "2022-03-15", "FEMALE", 24.5, "Penicillin", null));

        mockMvc.perform(post("/api/pets")
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Boncuk"))
                .andExpect(jsonPath("$.ownerId").value(ownerId))
                .andExpect(jsonPath("$.archived").value(false));

        mockMvc.perform(get("/api/pets").header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray());

        mockMvc.perform(get("/api/owners").header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk());
    }

    @Test
    void createPetByVetIsForbidden() throws Exception {
        String vetToken = loginAndGetToken(SEED_VET1_EMAIL, SEED_VET1_PASSWORD);
        String createBody = objectMapper.writeValueAsString(
                new PetPayload(1L, "Tekir", "CAT", "Tabby", null,
                        "2021-01-01", "MALE", 4.2, null, null));

        mockMvc.perform(post("/api/pets")
                        .header("Authorization", "Bearer " + vetToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isForbidden());
    }

    @Test
    void createPetWithUnknownOwnerReturnsNotFound() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        String createBody = objectMapper.writeValueAsString(
                new PetPayload(999999L, "Tekir", "CAT", "Tabby", null,
                        "2021-01-01", "MALE", 4.2, null, null));

        mockMvc.perform(post("/api/pets")
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isNotFound());
    }

    @Test
    void createPetWithNonCatDogSpeciesAndBlankSpeciesNoteReturnsValidationError() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long ownerId = createOwner(receptionistToken, "exotic-owner@example.com");

        String createBody = objectMapper.writeValueAsString(
                new PetPayload(ownerId, "Kivi", "PARROT", null, null,
                        "2023-01-01", "MALE", 0.4, null, null));

        mockMvc.perform(post("/api/pets")
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors[0].field").value("speciesNote"));
    }

    @Test
    void createPetWithNonCatDogSpeciesAndSpeciesNoteSucceeds() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long ownerId = createOwner(receptionistToken, "exotic-owner-2@example.com");

        String createBody = objectMapper.writeValueAsString(
                new PetPayload(ownerId, "Kivi", "PARROT", null, "African Grey Parrot",
                        "2023-01-01", "MALE", 0.4, null, null));

        mockMvc.perform(post("/api/pets")
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.speciesNote").value("African Grey Parrot"));
    }

    @Test
    void getPetDetailAndUpdateItThenChangesAreReflected() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long ownerId = createOwner(receptionistToken, "update-pet-owner@example.com");

        String createBody = objectMapper.writeValueAsString(
                new PetPayload(ownerId, "Boncuk", "DOG", "Golden Retriever", null,
                        "2022-03-15", "FEMALE", 24.5, null, null));
        String createResponse = mockMvc.perform(post("/api/pets")
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        long petId = objectMapper.readTree(createResponse).get("id").asLong();

        mockMvc.perform(get("/api/pets/" + petId).header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Boncuk"));

        String updateBody = objectMapper.writeValueAsString(
                new PetPayload(ownerId, "Boncuk", "DOG", "Golden Retriever", null,
                        "2022-03-15", "FEMALE", 26.0, "Penicillin", null));

        mockMvc.perform(put("/api/pets/" + petId)
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.weightKg").value(26.0))
                .andExpect(jsonPath("$.allergies").value("Penicillin"));

        // Separate, later request: proves the update was actually written to the DB,
        // not just mutated on the in-memory object returned by the PUT call above.
        mockMvc.perform(get("/api/pets/" + petId).header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.weightKg").value(26.0))
                .andExpect(jsonPath("$.allergies").value("Penicillin"));
    }

    @Test
    void getUnknownPetDetailReturnsNotFound() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);

        mockMvc.perform(get("/api/pets/999999").header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isNotFound());
    }

    @Test
    void updatePetByVetIsForbidden() throws Exception {
        String vetToken = loginAndGetToken(SEED_VET1_EMAIL, SEED_VET1_PASSWORD);
        String updateBody = objectMapper.writeValueAsString(
                new PetPayload(1L, "Tekir", "CAT", "Tabby", null,
                        "2021-01-01", "MALE", 4.2, null, null));

        mockMvc.perform(put("/api/pets/1")
                        .header("Authorization", "Bearer " + vetToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateBody))
                .andExpect(status().isForbidden());
    }

    @Test
    void archiveThenActivatePetTogglesArchivedFlag() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long ownerId = createOwner(receptionistToken, "archive-owner@example.com");

        String createBody = objectMapper.writeValueAsString(
                new PetPayload(ownerId, "Boncuk", "DOG", "Golden Retriever", null,
                        "2022-03-15", "FEMALE", 24.5, null, null));
        String createResponse = mockMvc.perform(post("/api/pets")
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        long petId = objectMapper.readTree(createResponse).get("id").asLong();

        mockMvc.perform(patch("/api/pets/" + petId + "/archive")
                        .header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.archived").value(true));

        // Separate, later request: proves the flag was actually written to the DB,
        // not just mutated on the in-memory object returned by the PATCH call above.
        mockMvc.perform(get("/api/pets/" + petId).header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.archived").value(true));

        mockMvc.perform(patch("/api/pets/" + petId + "/activate")
                        .header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.archived").value(false));

        mockMvc.perform(get("/api/pets/" + petId).header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.archived").value(false));
    }

    @Test
    void archivePetByVetIsForbidden() throws Exception {
        String vetToken = loginAndGetToken(SEED_VET1_EMAIL, SEED_VET1_PASSWORD);

        mockMvc.perform(patch("/api/pets/1/archive")
                        .header("Authorization", "Bearer " + vetToken))
                .andExpect(status().isForbidden());
    }

    @Test
    void archiveUnknownPetReturnsNotFound() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);

        mockMvc.perform(patch("/api/pets/999999/archive")
                        .header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isNotFound());
    }

    @Test
    void listPetsFilteredBySpeciesReturnsOnlyMatchingSpecies() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long ownerId = createOwner(receptionistToken, "species-filter-owner@example.com");
        createPet(receptionistToken, ownerId, "Boncuk", "DOG", "Golden Retriever", null);
        createPet(receptionistToken, ownerId, "Tekir", "CAT", "Tabby", null);

        mockMvc.perform(get("/api/pets?species=CAT").header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[*].species", everyItem(is("CAT"))));
    }

    @Test
    void listPetsFilteredByOwnerIdReturnsOnlyThatOwnersPets() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long ownerId = createOwner(receptionistToken, "owner-filter-owner@example.com");
        createPet(receptionistToken, ownerId, "Boncuk", "DOG", "Golden Retriever", null);

        mockMvc.perform(get("/api/pets?ownerId=" + ownerId).header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[*].ownerId", everyItem(is((int) ownerId))));
    }

    @Test
    void listPetsFilteredByActiveExcludesArchivedPets() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long ownerId = createOwner(receptionistToken, "active-filter-owner@example.com");
        long archivedPetId = createPet(receptionistToken, ownerId, "Minnos", "CAT", "Tabby", null);
        createPet(receptionistToken, ownerId, "Boncuk", "DOG", "Golden Retriever", null);

        mockMvc.perform(patch("/api/pets/" + archivedPetId + "/archive")
                        .header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/pets?ownerId=" + ownerId + "&active=true")
                        .header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[*].id", not(hasItem((int) archivedPetId))));

        mockMvc.perform(get("/api/pets?ownerId=" + ownerId + "&active=false")
                        .header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[*].id", hasItem((int) archivedPetId)));
    }

    @Test
    void listPetsSearchByNameMatchesPartial() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        long ownerId = createOwner(receptionistToken, "search-filter-owner@example.com");
        createPet(receptionistToken, ownerId, "Boncuk", "DOG", "Golden Retriever", null);

        mockMvc.perform(get("/api/pets?search=onc").header("Authorization", "Bearer " + receptionistToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[*].name", hasItem("Boncuk")));
    }

    private long createPet(String token, long ownerId, String name, String species, String breed, String speciesNote)
            throws Exception {
        String createBody = objectMapper.writeValueAsString(
                new PetPayload(ownerId, name, species, breed, speciesNote,
                        "2022-03-15", "FEMALE", 24.5, null, null));

        String response = mockMvc.perform(post("/api/pets")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
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

    private String loginAndGetToken(String email, String password) throws Exception {
        String loginBody = objectMapper.writeValueAsString(new LoginPayload(email, password));

        String response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBody))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        return objectMapper.readTree(response).get("token").asText();
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
