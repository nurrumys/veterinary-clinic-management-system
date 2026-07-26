package com.efe.veterinaryclinic.support.dto;

import com.efe.veterinaryclinic.support.SupportRequestStatus;
import jakarta.validation.constraints.NotNull;

public record SupportRequestStatusUpdateRequest(@NotNull(message = "must not be null") SupportRequestStatus status, String adminResponse) {
}
