package com.efe.veterinaryclinic.visit.dto;

import com.efe.veterinaryclinic.visit.VisitStatus;
import jakarta.validation.constraints.NotNull;

public record VisitStatusUpdateRequest(
        @NotNull(message = "must not be null")
        VisitStatus status
) {
}
