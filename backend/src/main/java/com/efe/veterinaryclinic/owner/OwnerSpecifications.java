package com.efe.veterinaryclinic.owner;

import org.springframework.data.jpa.domain.Specification;

final class OwnerSpecifications {

    private OwnerSpecifications() {
    }

    static Specification<Owner> nameContains(String search) {
        String pattern = "%" + search.toLowerCase() + "%";
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("firstName")), pattern),
                cb.like(cb.lower(root.get("lastName")), pattern));
    }
}
