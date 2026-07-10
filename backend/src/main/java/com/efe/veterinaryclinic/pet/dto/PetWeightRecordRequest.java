package com.efe.veterinaryclinic.pet.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;

public record PetWeightRecordRequest(
        @NotNull(message = "must not be null")
        @Positive(message = "must be positive")
        Double weightKg,

        @NotNull(message = "must not be null")
        LocalDateTime recordedAt,

        String note
) {
}
