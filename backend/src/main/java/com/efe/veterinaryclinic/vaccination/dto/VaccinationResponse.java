package com.efe.veterinaryclinic.vaccination.dto;

import com.efe.veterinaryclinic.vaccination.Vaccination;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record VaccinationResponse(
        Long id,
        Long petId,
        String vaccineType,
        LocalDateTime administeredAt,
        String lotNumber,
        LocalDate nextDueDate,
        String administeredBy,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static VaccinationResponse from(Vaccination vaccination) {
        return new VaccinationResponse(
                vaccination.getId(),
                vaccination.getPet().getId(),
                vaccination.getVaccineType(),
                vaccination.getAdministeredAt(),
                vaccination.getLotNumber(),
                vaccination.getNextDueDate(),
                vaccination.getAdministeredBy(),
                vaccination.getCreatedAt(),
                vaccination.getUpdatedAt()
        );
    }
}
