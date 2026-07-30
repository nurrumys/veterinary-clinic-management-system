package com.efe.veterinaryclinic.search.dto;

public record PetSearchResult(
        Long id,
        String name,
        String species,
        Long ownerId,
        String ownerName
) {
}
