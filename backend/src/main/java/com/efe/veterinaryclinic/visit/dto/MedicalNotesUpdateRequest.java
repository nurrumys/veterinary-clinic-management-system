package com.efe.veterinaryclinic.visit.dto;

import java.time.LocalDate;

public record MedicalNotesUpdateRequest(
        String diagnosis,
        String treatmentNotes,
        LocalDate followUpDate
) {
}
