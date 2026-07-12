package com.efe.veterinaryclinic.dashboard.dto;

import java.math.BigDecimal;

public record MonthlyRevenueEntry(
        String month,
        BigDecimal revenue
) {
}
