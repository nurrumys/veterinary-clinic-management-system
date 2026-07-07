package com.efe.veterinaryclinic.pet;

import org.springframework.data.jpa.domain.Specification;

final class PetSpecifications {

    private PetSpecifications() {
    }

    static Specification<Pet> nameContains(String search) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + search.toLowerCase() + "%");
    }

    static Specification<Pet> hasSpecies(String species) {
        return (root, query, cb) -> cb.equal(cb.lower(root.get("species")), species.toLowerCase());
    }

    static Specification<Pet> hasOwnerId(Long ownerId) {
        return (root, query, cb) -> cb.equal(root.get("owner").get("id"), ownerId);
    }

    static Specification<Pet> isArchived(boolean archived) {
        return (root, query, cb) -> cb.equal(root.get("archived"), archived);
    }
}
