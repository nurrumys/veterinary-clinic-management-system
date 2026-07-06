package com.efe.veterinaryclinic.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void authMeIsNotPublic() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void authLoginIsPublic() throws Exception {
        // permitAll means the security filter chain lets the request through;
        // an empty body then fails validation (400) instead of being rejected by
        // the filter chain (401), proving this path is not authenticated.
        mockMvc.perform(post("/api/auth/login")).andExpect(status().isBadRequest());
    }

    @Test
    void authRegisterRequiresAdminAuthentication() throws Exception {
        // register is admin-only now: an unauthenticated request must be rejected
        // by the security filter chain before it ever reaches the controller.
        mockMvc.perform(post("/api/auth/register")).andExpect(status().isUnauthorized());
    }
}
