package com.efe.veterinaryclinic.vet.dto;

import com.efe.veterinaryclinic.vet.Vet;

import java.time.LocalDateTime;

public record VetResponse(
        Long id,
        String name,
        String specialty,
        String licenseNo,
        String workHours,
        boolean active,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static VetResponse from(Vet vet) {
        return new VetResponse(
                vet.getId(),
                vet.getName(),
                vet.getSpecialty(),
                vet.getLicenseNo(),
                vet.getWorkHours(),
                vet.isActive(),
                vet.getCreatedAt(),
                vet.getUpdatedAt()
        );
    }
}
