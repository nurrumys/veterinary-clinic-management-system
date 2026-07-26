package com.efe.veterinaryclinic.support.dto;

import com.efe.veterinaryclinic.support.SupportRequest;
import com.efe.veterinaryclinic.support.SupportRequestStatus;

import java.time.LocalDateTime;

public record SupportRequestResponse(
        Long id,
        Long requestedByUserId,
        String requestedByName,
        String subject,
        String message,
        SupportRequestStatus status,
        String adminResponse,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static SupportRequestResponse from(SupportRequest supportRequest) {
        return new SupportRequestResponse(
                supportRequest.getId(),
                supportRequest.getRequestedBy().getId(),
                supportRequest.getRequestedBy().getFullName(),
                supportRequest.getSubject(),
                supportRequest.getMessage(),
                supportRequest.getStatus(),
                supportRequest.getAdminResponse(),
                supportRequest.getCreatedAt(),
                supportRequest.getUpdatedAt()
        );
    }
}
