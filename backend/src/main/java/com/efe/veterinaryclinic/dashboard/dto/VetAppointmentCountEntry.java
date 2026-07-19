package com.efe.veterinaryclinic.dashboard.dto;

public record VetAppointmentCountEntry(
        Long vetId,
        String vetName,
        long count
) {
}
