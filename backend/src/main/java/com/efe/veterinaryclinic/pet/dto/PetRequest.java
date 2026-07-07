package com.efe.veterinaryclinic.pet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record PetRequest(
        @NotNull(message = "must not be null")
        Long ownerId,

        @NotBlank(message = "must not be blank")
        String name,

        @NotBlank(message = "must not be blank")
        String species,

        String breed,

        String speciesNote,

        @NotNull(message = "must not be null")
        LocalDate birthDate,

        @NotBlank(message = "must not be blank")
        String sex,

        @NotNull(message = "must not be null")
        @Positive(message = "must be positive")
        Double weightKg,

        String allergies,

        String chronicConditions
) {
}
