package com.efe.veterinaryclinic.invoice;

import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

final class InvoiceSpecifications {

    private InvoiceSpecifications() {
    }

    static Specification<Invoice> hasStatus(InvoiceStatus status) {
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    static Specification<Invoice> issuedAtFrom(LocalDateTime from) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("issuedAt"), from);
    }

    static Specification<Invoice> issuedAtBefore(LocalDateTime before) {
        return (root, query, cb) -> cb.lessThan(root.get("issuedAt"), before);
    }
}
