package com.efe.veterinaryclinic.search.dto;

public record OwnerSearchResult(
        Long id,
        String firstName,
        String lastName,
        String phone,
        String email
) {
}
