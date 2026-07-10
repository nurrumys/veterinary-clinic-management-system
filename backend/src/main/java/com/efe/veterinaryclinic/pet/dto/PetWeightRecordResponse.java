package com.efe.veterinaryclinic.pet.dto;

import com.efe.veterinaryclinic.pet.PetWeightRecord;

import java.time.LocalDateTime;

public record PetWeightRecordResponse(
        Long id,
        Long petId,
        Double weightKg,
        LocalDateTime recordedAt,
        String note
) {

    public static PetWeightRecordResponse from(PetWeightRecord record) {
        return new PetWeightRecordResponse(
                record.getId(),
                record.getPet().getId(),
                record.getWeightKg(),
                record.getRecordedAt(),
                record.getNote()
        );
    }
}
