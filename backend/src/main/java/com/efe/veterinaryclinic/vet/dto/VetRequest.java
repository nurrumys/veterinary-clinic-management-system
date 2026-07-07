package com.efe.veterinaryclinic.vet.dto;

import jakarta.validation.constraints.NotBlank;

public record VetRequest(
        @NotBlank(message = "must not be blank")
        String name,

        @NotBlank(message = "must not be blank")
        String specialty,

        @NotBlank(message = "must not be blank")
        String licenseNo,

        @NotBlank(message = "must not be blank")
        String workHours
) {
}
