package com.efe.veterinaryclinic.notification.dto;

import java.time.LocalDateTime;

public record NewRecordNotification(
        NewRecordType recordType,
        Long id,
        String label,
        LocalDateTime createdAt
) {
}
