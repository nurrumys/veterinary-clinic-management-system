package com.efe.veterinaryclinic.notification.dto;

public record VaccinationDueTodayNotification(
        Long petId,
        String petName,
        String vaccineType
) {
}
