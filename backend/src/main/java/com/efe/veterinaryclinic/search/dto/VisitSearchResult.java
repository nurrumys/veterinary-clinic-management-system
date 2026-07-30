package com.efe.veterinaryclinic.search.dto;

import com.efe.veterinaryclinic.visit.VisitStatus;

import java.time.LocalDateTime;

public record VisitSearchResult(
        Long id,
        LocalDateTime scheduledAt,
        VisitStatus status,
        Long petId,
        String petName
) {
}
