package com.efe.veterinaryclinic.auth;

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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

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
    void adminRegistersNewUserThenNewUserLogsInAndFetchesMe() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);

        String registerBody = objectMapper.writeValueAsString(
                new RegisterPayload("Ayse Yilmaz", "new.receptionist@clinic.com", "secret123", "RECEPTIONIST"));

        mockMvc.perform(post("/api/auth/register")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("new.receptionist@clinic.com"))
                .andExpect(jsonPath("$.role").value("RECEPTIONIST"))
                .andExpect(jsonPath("$.token").doesNotExist());

        String newUserToken = loginAndGetToken("new.receptionist@clinic.com", "secret123");

        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + newUserToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("new.receptionist@clinic.com"))
                .andExpect(jsonPath("$.role").value("RECEPTIONIST"));
    }

    @Test
    void registerWithDuplicateEmailReturnsConflict() throws Exception {
        String adminToken = loginAndGetToken(SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD);
        String registerBody = objectMapper.writeValueAsString(
                new RegisterPayload("Mehmet Demir", "new.vet@clinic.com", "secret123", "VET"));

        mockMvc.perform(post("/api/auth/register")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerBody))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/auth/register")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerBody))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status").value(409));
    }

    @Test
    void registerByNonAdminIsForbidden() throws Exception {
        String receptionistToken = loginAndGetToken(SEED_RECEPTIONIST_EMAIL, SEED_RECEPTIONIST_PASSWORD);
        String registerBody = objectMapper.writeValueAsString(
                new RegisterPayload("Someone Else", "someone.else@clinic.com", "secret123", "VET"));

        mockMvc.perform(post("/api/auth/register")
                        .header("Authorization", "Bearer " + receptionistToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerBody))
                .andExpect(status().isForbidden());
    }

    @Test
    void loginWithWrongPasswordReturnsUnauthorized() throws Exception {
        String loginBody = objectMapper.writeValueAsString(
                new LoginPayload(SEED_ADMIN_EMAIL, "wrong-password"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginBody))
                .andExpect(status().isUnauthorized());
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

    private record RegisterPayload(String fullName, String email, String password, String role) {
    }

    private record LoginPayload(String email, String password) {
    }
}
