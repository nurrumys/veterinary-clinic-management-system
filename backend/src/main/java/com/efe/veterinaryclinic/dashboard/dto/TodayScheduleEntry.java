package com.efe.veterinaryclinic.dashboard.dto;

import com.efe.veterinaryclinic.visit.VisitStatus;

import java.time.LocalDateTime;

public record TodayScheduleEntry(
        Long visitId,
        String petName,
        String vetName,
        LocalDateTime scheduledAt,
        VisitStatus status
) {
}
