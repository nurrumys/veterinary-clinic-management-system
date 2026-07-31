package com.efe.veterinaryclinic.vet.dto;

public record VetStatsResponse(
        long totalVets,
        long availableDoctors,
        long specialties,
        long newThisMonth
) {
}
