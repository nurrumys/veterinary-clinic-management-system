package com.efe.veterinaryclinic.invoice.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record InvoiceRequest(
        @NotNull(message = "must not be null")
        Long visitId,

        @NotEmpty(message = "must not be empty")
        @Valid
        List<InvoiceItemRequest> items
) {
}
