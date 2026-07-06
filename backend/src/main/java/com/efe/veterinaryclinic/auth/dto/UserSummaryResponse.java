package com.efe.veterinaryclinic.auth.dto;

import com.efe.veterinaryclinic.security.Role;

public record UserSummaryResponse(
        Long id,
        String fullName,
        String email,
        Role role
) {
}
