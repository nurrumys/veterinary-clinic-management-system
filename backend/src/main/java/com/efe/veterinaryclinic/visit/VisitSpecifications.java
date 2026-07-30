package com.efe.veterinaryclinic.visit;

import com.efe.veterinaryclinic.pet.Pet;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

final class VisitSpecifications {

    private VisitSpecifications() {
    }

    static Specification<Visit> matchesSearch(String search) {
        String pattern = "%" + search.toLowerCase() + "%";
        return (root, query, cb) -> {
            Join<Visit, Pet> pet = root.join("pet", JoinType.INNER);
            return cb.or(
                    cb.like(cb.lower(pet.get("name")), pattern),
                    cb.like(cb.lower(root.get("chiefComplaint")), pattern));
        };
    }

    static Specification<Visit> hasVetId(Long vetId) {
        return (root, query, cb) -> cb.equal(root.get("vet").get("id"), vetId);
    }

    static Specification<Visit> hasStatus(VisitStatus status) {
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    static Specification<Visit> scheduledAtFrom(LocalDateTime from) {
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("scheduledAt"), from);
    }

    static Specification<Visit> scheduledAtBefore(LocalDateTime before) {
        return (root, query, cb) -> cb.lessThan(root.get("scheduledAt"), before);
    }
}
