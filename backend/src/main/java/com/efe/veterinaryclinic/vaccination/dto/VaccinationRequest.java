package com.efe.veterinaryclinic.vaccination.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record VaccinationRequest(
        @NotNull(message = "must not be null")
        Long petId,

        @NotBlank(message = "must not be blank")
        String vaccineType,

        @NotNull(message = "must not be null")
        LocalDateTime administeredAt,

        String lotNumber,

        String administeredBy
) {
}
