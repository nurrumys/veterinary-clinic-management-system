package com.efe.veterinaryclinic.vaccination.dto;

public record VaccinationStatsResponse(
        long totalVaccinations,
        long administeredToday,
        long upcomingDue,
        long vaccinatedPets
) {
}
