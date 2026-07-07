package com.efe.veterinaryclinic.owner.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record OwnerRequest(
        @NotBlank(message = "must not be blank")
        String firstName,

        @NotBlank(message = "must not be blank")
        String lastName,

        @NotBlank(message = "must not be blank")
        String phone,

        @NotBlank(message = "must not be blank")
        @Email(message = "must be a valid email address")
        String email,

        @NotBlank(message = "must not be blank")
        String address
) {
}
