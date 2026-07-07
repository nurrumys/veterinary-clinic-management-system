package com.efe.veterinaryclinic.owner;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.common.exception.ConflictException;
import com.efe.veterinaryclinic.common.exception.ResourceNotFoundException;
import com.efe.veterinaryclinic.owner.dto.OwnerDetailResponse;
import com.efe.veterinaryclinic.owner.dto.OwnerRequest;
import com.efe.veterinaryclinic.owner.dto.OwnerResponse;
import com.efe.veterinaryclinic.pet.PetRepository;
import com.efe.veterinaryclinic.pet.dto.PetResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnerService {

    private final OwnerRepository ownerRepository;
    private final PetRepository petRepository;

    public OwnerService(OwnerRepository ownerRepository, PetRepository petRepository) {
        this.ownerRepository = ownerRepository;
        this.petRepository = petRepository;
    }

    public OwnerResponse create(OwnerRequest request) {
        Owner owner = new Owner(request.firstName(), request.lastName(), request.phone(),
                request.email(), request.address());
        Owner saved = ownerRepository.save(owner);

        return toResponse(saved);
    }

    public PageResponse<OwnerResponse> list(Pageable pageable) {
        return PageResponse.from(ownerRepository.findAll(pageable).map(this::toResponse));
    }

    public OwnerDetailResponse getById(Long id) {
        Owner owner = findOrThrow(id);
        List<PetResponse> pets = petRepository.findByOwnerId(id).stream()
                .map(PetResponse::from)
                .toList();

        return OwnerDetailResponse.from(owner, pets);
    }

    public OwnerResponse update(Long id, OwnerRequest request) {
        Owner owner = findOrThrow(id);
        owner.update(request.firstName(), request.lastName(), request.phone(), request.email(), request.address());

        return toResponse(ownerRepository.save(owner));
    }

    public void delete(Long id) {
        Owner owner = findOrThrow(id);
        long petCount = petRepository.countByOwnerId(owner.getId());
        if (petCount > 0) {
            throw new ConflictException("Owner has " + petCount + " pet(s) and cannot be deleted");
        }

        ownerRepository.delete(owner);
    }

    private Owner findOrThrow(Long id) {
        return ownerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found with id " + id));
    }

    private OwnerResponse toResponse(Owner owner) {
        return OwnerResponse.from(owner, petRepository.countByOwnerId(owner.getId()));
    }
}
