package com.efe.veterinaryclinic.dashboard.dto;

import java.time.LocalDate;

public record VaccinationAlertEntry(
        Long petId,
        String petName,
        String vaccineType,
        LocalDate nextDueDate
) {
}
