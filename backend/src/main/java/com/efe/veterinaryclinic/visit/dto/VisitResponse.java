package com.efe.veterinaryclinic.visit.dto;

import com.efe.veterinaryclinic.visit.Visit;
import com.efe.veterinaryclinic.visit.VisitStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record VisitResponse(
        Long id,
        Long petId,
        Long vetId,
        LocalDateTime scheduledAt,
        VisitStatus status,
        String chiefComplaint,
        String diagnosis,
        String treatmentNotes,
        LocalDate followUpDate,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static VisitResponse from(Visit visit) {
        return new VisitResponse(
                visit.getId(),
                visit.getPet().getId(),
                visit.getVet().getId(),
                visit.getScheduledAt(),
                visit.getStatus(),
                visit.getChiefComplaint(),
                visit.getDiagnosis(),
                visit.getTreatmentNotes(),
                visit.getFollowUpDate(),
                visit.getCreatedAt(),
                visit.getUpdatedAt()
        );
    }
}
