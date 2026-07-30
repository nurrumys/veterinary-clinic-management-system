package com.efe.veterinaryclinic.search.dto;

import java.util.List;

public record SearchResponse(
        List<OwnerSearchResult> owners,
        List<PetSearchResult> pets,
        List<VisitSearchResult> visits
) {
}
