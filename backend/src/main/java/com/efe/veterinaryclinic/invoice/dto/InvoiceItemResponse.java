package com.efe.veterinaryclinic.invoice.dto;

import com.efe.veterinaryclinic.invoice.InvoiceItem;
import com.efe.veterinaryclinic.invoice.InvoiceItemCategory;

import java.math.BigDecimal;

public record InvoiceItemResponse(
        Long id,
        String description,
        InvoiceItemCategory category,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal lineTotal
) {

    public static InvoiceItemResponse from(InvoiceItem item) {
        return new InvoiceItemResponse(
                item.getId(),
                item.getDescription(),
                item.getCategory(),
                item.getQuantity(),
                item.getUnitPrice(),
                item.getLineTotal()
        );
    }
}
