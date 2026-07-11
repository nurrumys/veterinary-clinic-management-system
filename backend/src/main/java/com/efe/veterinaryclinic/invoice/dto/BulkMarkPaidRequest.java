package com.efe.veterinaryclinic.invoice.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record BulkMarkPaidRequest(
        @NotEmpty(message = "must not be empty")
        List<Long> invoiceIds
) {
}
