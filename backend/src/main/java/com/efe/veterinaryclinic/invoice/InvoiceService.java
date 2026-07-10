package com.efe.veterinaryclinic.invoice;

import com.efe.veterinaryclinic.common.exception.ResourceNotFoundException;
import com.efe.veterinaryclinic.invoice.dto.InvoiceItemRequest;
import com.efe.veterinaryclinic.invoice.dto.InvoiceRequest;
import com.efe.veterinaryclinic.invoice.dto.InvoiceResponse;
import com.efe.veterinaryclinic.visit.Visit;
import com.efe.veterinaryclinic.visit.VisitRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class InvoiceService {

    private static final BigDecimal VAT_RATE = new BigDecimal("0.18");
    private static final int CURRENCY_SCALE = 2;

    private final InvoiceRepository invoiceRepository;
    private final VisitRepository visitRepository;

    public InvoiceService(InvoiceRepository invoiceRepository, VisitRepository visitRepository) {
        this.invoiceRepository = invoiceRepository;
        this.visitRepository = visitRepository;
    }

    public InvoiceResponse create(InvoiceRequest request) {
        Visit visit = findVisitOrThrow(request.visitId());

        List<InvoiceItem> items = request.items().stream()
                .map(this::toInvoiceItem)
                .toList();

        BigDecimal subtotal = items.stream()
                .map(InvoiceItem::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal vatAmount = subtotal.multiply(VAT_RATE).setScale(CURRENCY_SCALE, RoundingMode.HALF_UP);
        BigDecimal total = subtotal.add(vatAmount);

        Invoice invoice = new Invoice(visit, items, subtotal, VAT_RATE, vatAmount, total);
        Invoice saved = invoiceRepository.save(invoice);

        return InvoiceResponse.from(saved);
    }

    public InvoiceResponse getById(Long id) {
        return InvoiceResponse.from(findInvoiceOrThrow(id));
    }

    private InvoiceItem toInvoiceItem(InvoiceItemRequest itemRequest) {
        BigDecimal lineTotal = itemRequest.unitPrice()
                .multiply(BigDecimal.valueOf(itemRequest.quantity()))
                .setScale(CURRENCY_SCALE, RoundingMode.HALF_UP);

        return new InvoiceItem(itemRequest.description(), itemRequest.category(), itemRequest.quantity(),
                itemRequest.unitPrice(), lineTotal);
    }

    private Invoice findInvoiceOrThrow(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id " + id));
    }

    private Visit findVisitOrThrow(Long visitId) {
        return visitRepository.findById(visitId)
                .orElseThrow(() -> new ResourceNotFoundException("Visit not found with id " + visitId));
    }
}
