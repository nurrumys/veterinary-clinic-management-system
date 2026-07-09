package com.efe.veterinaryclinic.visit.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record VisitRequest(
        @NotNull(message = "must not be null")
        Long petId,

        @NotNull(message = "must not be null")
        Long vetId,

        @NotNull(message = "must not be null")
        LocalDateTime scheduledAt,

        @NotBlank(message = "must not be blank")
        String chiefComplaint
) {
}
