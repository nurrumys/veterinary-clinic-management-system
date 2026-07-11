package com.efe.veterinaryclinic.invoice;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.invoice.dto.BulkMarkPaidRequest;
import com.efe.veterinaryclinic.invoice.dto.InvoiceRequest;
import com.efe.veterinaryclinic.invoice.dto.InvoiceResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping
    public ResponseEntity<InvoiceResponse> create(@Valid @RequestBody InvoiceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(invoiceService.create(request));
    }

    @GetMapping
    public ResponseEntity<PageResponse<InvoiceResponse>> list(
            @RequestParam(required = false) InvoiceStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to,
            Pageable pageable) {
        return ResponseEntity.ok(invoiceService.list(status, from, to, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.getById(id));
    }

    @PatchMapping("/{id}/send")
    public ResponseEntity<InvoiceResponse> markSent(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.markSent(id));
    }

    @PatchMapping("/{id}/mark-paid")
    public ResponseEntity<InvoiceResponse> markPaid(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.markPaid(id));
    }

    @PatchMapping("/bulk-mark-paid")
    public ResponseEntity<List<InvoiceResponse>> bulkMarkPaid(@Valid @RequestBody BulkMarkPaidRequest request) {
        return ResponseEntity.ok(invoiceService.bulkMarkPaid(request));
    }
}
