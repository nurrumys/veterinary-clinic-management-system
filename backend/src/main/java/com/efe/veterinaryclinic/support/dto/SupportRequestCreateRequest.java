package com.efe.veterinaryclinic.support.dto;

import jakarta.validation.constraints.NotBlank;

public record SupportRequestCreateRequest(
        @NotBlank(message = "must not be blank")
        String subject,

        @NotBlank(message = "must not be blank")
        String message
) {
}
