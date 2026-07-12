package com.efe.veterinaryclinic.dashboard.dto;

import com.efe.veterinaryclinic.invoice.InvoiceItemCategory;

import java.math.BigDecimal;

public record RevenueCategoryEntry(
        InvoiceItemCategory category,
        BigDecimal amount
) {
}
