package com.efe.veterinaryclinic.dashboard.dto;

import java.time.LocalDate;

public record CumulativeAppointmentEntry(
        LocalDate date,
        long cumulativeCount
) {
}
