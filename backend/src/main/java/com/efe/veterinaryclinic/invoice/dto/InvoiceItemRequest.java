package com.efe.veterinaryclinic.invoice.dto;

import com.efe.veterinaryclinic.invoice.InvoiceItemCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record InvoiceItemRequest(
        @NotBlank(message = "must not be blank")
        String description,

        @NotNull(message = "must not be null")
        InvoiceItemCategory category,

        @NotNull(message = "must not be null")
        @Positive(message = "must be positive")
        Integer quantity,

        @NotNull(message = "must not be null")
        @Positive(message = "must be positive")
        BigDecimal unitPrice
) {
}
