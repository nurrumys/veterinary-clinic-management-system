package com.efe.veterinaryclinic.pet.dto;

public record PetStatsResponse(
        long totalPets,
        long dogs,
        long cats,
        long newThisMonth
) {
}
