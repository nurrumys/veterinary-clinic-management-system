package com.efe.veterinaryclinic.invoice.dto;

public record InvoiceStatsResponse(
        long totalInvoices,
        long draft,
        long sent,
        long paid
) {
}
