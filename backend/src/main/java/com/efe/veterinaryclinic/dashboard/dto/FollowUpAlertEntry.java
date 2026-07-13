package com.efe.veterinaryclinic.dashboard.dto;

import java.time.LocalDate;

public record FollowUpAlertEntry(
        Long visitId,
        String petName,
        LocalDate followUpDate
) {
}
