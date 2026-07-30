package com.efe.veterinaryclinic.search;

import com.efe.veterinaryclinic.owner.OwnerService;
import com.efe.veterinaryclinic.pet.PetService;
import com.efe.veterinaryclinic.search.dto.OwnerSearchResult;
import com.efe.veterinaryclinic.search.dto.PetSearchResult;
import com.efe.veterinaryclinic.search.dto.SearchResponse;
import com.efe.veterinaryclinic.search.dto.VisitSearchResult;
import com.efe.veterinaryclinic.visit.VisitService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SearchService {

    private static final int MAX_RESULTS_PER_TYPE = 5;

    private final OwnerService ownerService;
    private final PetService petService;
    private final VisitService visitService;

    public SearchService(OwnerService ownerService, PetService petService, VisitService visitService) {
        this.ownerService = ownerService;
        this.petService = petService;
        this.visitService = visitService;
    }

    @Transactional(readOnly = true)
    public SearchResponse search(String q) {
        if (q == null || q.isBlank()) {
            return new SearchResponse(List.of(), List.of(), List.of());
        }

        List<OwnerSearchResult> owners = ownerService.searchTop(q, MAX_RESULTS_PER_TYPE).stream()
                .map(owner -> new OwnerSearchResult(owner.getId(), owner.getFirstName(), owner.getLastName(),
                        owner.getPhone(), owner.getEmail()))
                .toList();
        List<PetSearchResult> pets = petService.searchTop(q, MAX_RESULTS_PER_TYPE).stream()
                .map(pet -> new PetSearchResult(pet.getId(), pet.getName(), pet.getSpecies(),
                        pet.getOwner().getId(), pet.getOwner().getFirstName() + " " + pet.getOwner().getLastName()))
                .toList();
        List<VisitSearchResult> visits = visitService.searchTop(q, MAX_RESULTS_PER_TYPE).stream()
                .map(visit -> new VisitSearchResult(visit.getId(), visit.getScheduledAt(), visit.getStatus(),
                        visit.getPet().getId(), visit.getPet().getName()))
                .toList();

        return new SearchResponse(owners, pets, visits);
    }
}
