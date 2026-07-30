package com.efe.veterinaryclinic.notification.dto;

import java.time.LocalDateTime;

public record UpcomingAppointmentNotification(
        Long visitId,
        String petName,
        String vetName,
        LocalDateTime scheduledAt
) {
}
