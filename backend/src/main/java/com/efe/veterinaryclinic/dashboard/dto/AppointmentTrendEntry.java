package com.efe.veterinaryclinic.dashboard.dto;

import java.time.LocalDate;

public record AppointmentTrendEntry(
        LocalDate date,
        long count
) {
}
