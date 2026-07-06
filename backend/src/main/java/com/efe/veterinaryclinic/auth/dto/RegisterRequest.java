package com.efe.veterinaryclinic.auth.dto;

import com.efe.veterinaryclinic.security.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "must not be blank")
        String fullName,

        @NotBlank(message = "must not be blank")
        @Email(message = "must be a valid email address")
        String email,

        @NotBlank(message = "must not be blank")
        @Size(min = 8, message = "must be at least 8 characters")
        String password,

        @NotNull(message = "must not be null")
        Role role
) {
}
