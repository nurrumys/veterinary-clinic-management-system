package com.efe.veterinaryclinic.vet.dto;

import java.math.BigDecimal;

public record VetPerformanceResponse(
        Long vetId,
        String vetName,
        long totalVisitsYtd,
        long completedVisitsYtd,
        long cancelledVisitsYtd,
        long upcomingVisits,
        BigDecimal revenueGeneratedYtd
) {
}
