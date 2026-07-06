package com.efe.veterinaryclinic.security;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class JwtServiceTest {

    private static final String SECRET = "test-only-veterinary-clinic-jwt-secret-key-for-unit-tests";

    private final JwtService jwtService = new JwtService(SECRET, 3600000L);

    @Test
    void generatesTokenAndExtractsEmail() {
        String token = jwtService.generateToken("vet@clinic.com", "VET");

        assertThat(jwtService.extractEmail(token)).isEqualTo("vet@clinic.com");
        assertThat(jwtService.isTokenValid(token, "vet@clinic.com")).isTrue();
    }

    @Test
    void tokenIsInvalidForDifferentEmail() {
        String token = jwtService.generateToken("vet@clinic.com", "VET");

        assertThat(jwtService.isTokenValid(token, "someone-else@clinic.com")).isFalse();
    }

    @Test
    void expiredTokenIsInvalid() throws InterruptedException {
        JwtService shortLivedJwtService = new JwtService(SECRET, 1L);
        String token = shortLivedJwtService.generateToken("vet@clinic.com", "VET");

        Thread.sleep(10);

        assertThat(shortLivedJwtService.isTokenValid(token, "vet@clinic.com")).isFalse();
    }
}
