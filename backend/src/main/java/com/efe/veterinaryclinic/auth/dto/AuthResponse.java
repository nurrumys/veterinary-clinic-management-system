package com.efe.veterinaryclinic.auth.dto;

public record AuthResponse(
        String token,
        UserSummaryResponse user
) {
}
