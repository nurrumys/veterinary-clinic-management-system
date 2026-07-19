package com.efe.veterinaryclinic.pet.dto;

import com.efe.veterinaryclinic.pet.Pet;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record PetResponse(
        Long id,
        Long ownerId,
        String name,
        String species,
        String breed,
        String speciesNote,
        LocalDate birthDate,
        String sex,
        Double weightKg,
        String allergies,
        String chronicConditions,
        boolean archived,
        boolean inactive,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static PetResponse from(Pet pet, boolean inactive) {
        return new PetResponse(
                pet.getId(),
                pet.getOwner().getId(),
                pet.getName(),
                pet.getSpecies(),
                pet.getBreed(),
                pet.getSpeciesNote(),
                pet.getBirthDate(),
                pet.getSex(),
                pet.getWeightKg(),
                pet.getAllergies(),
                pet.getChronicConditions(),
                pet.isArchived(),
                inactive,
                pet.getCreatedAt(),
                pet.getUpdatedAt()
        );
    }
}
