package com.efe.veterinaryclinic.invoice;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, Long> {

    List<InvoiceItem> findByInvoice_IssuedAtGreaterThanEqual(LocalDateTime from);
}
