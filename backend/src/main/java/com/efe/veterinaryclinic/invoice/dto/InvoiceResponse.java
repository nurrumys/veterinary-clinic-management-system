package com.efe.veterinaryclinic.invoice.dto;

import com.efe.veterinaryclinic.invoice.Invoice;
import com.efe.veterinaryclinic.invoice.InvoiceStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record InvoiceResponse(
        Long id,
        Long visitId,
        LocalDateTime issuedAt,
        BigDecimal subtotal,
        BigDecimal vatRate,
        BigDecimal vatAmount,
        BigDecimal total,
        InvoiceStatus status,
        List<InvoiceItemResponse> items,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    public static InvoiceResponse from(Invoice invoice) {
        return new InvoiceResponse(
                invoice.getId(),
                invoice.getVisit().getId(),
                invoice.getIssuedAt(),
                invoice.getSubtotal(),
                invoice.getVatRate(),
                invoice.getVatAmount(),
                invoice.getTotal(),
                invoice.getStatus(),
                invoice.getItems().stream().map(InvoiceItemResponse::from).toList(),
                invoice.getCreatedAt(),
                invoice.getUpdatedAt()
        );
    }
}
