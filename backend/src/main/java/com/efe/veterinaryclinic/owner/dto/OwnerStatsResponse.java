package com.efe.veterinaryclinic.owner.dto;

public record OwnerStatsResponse(
        long totalOwners,
        long totalPets,
        long newOwnersThisMonth
) {
}
