package com.efe.veterinaryclinic.pet;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.common.exception.BusinessRuleViolationException;
import com.efe.veterinaryclinic.common.exception.ResourceNotFoundException;
import com.efe.veterinaryclinic.owner.Owner;
import com.efe.veterinaryclinic.owner.OwnerRepository;
import com.efe.veterinaryclinic.pet.dto.PetRequest;
import com.efe.veterinaryclinic.pet.dto.PetResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class PetService {

    private static final Set<String> SPECIES_WITH_BREED = Set.of("CAT", "DOG");

    private final PetRepository petRepository;
    private final OwnerRepository ownerRepository;

    public PetService(PetRepository petRepository, OwnerRepository ownerRepository) {
        this.petRepository = petRepository;
        this.ownerRepository = ownerRepository;
    }

    public PetResponse create(PetRequest request) {
        validateSpeciesBreedRule(request.species(), request.speciesNote());
        Owner owner = findOwnerOrThrow(request.ownerId());

        Pet pet = new Pet(owner, request.name(), request.species(), request.breed(), request.speciesNote(),
                request.birthDate(), request.sex(), request.weightKg(), request.allergies(), request.chronicConditions());
        Pet saved = petRepository.save(pet);

        return PetResponse.from(saved);
    }

    public PageResponse<PetResponse> list(String search, String species, Long ownerId, Boolean active, Pageable pageable) {
        Specification<Pet> spec = (root, query, cb) -> cb.conjunction();

        if (search != null && !search.isBlank()) {
            spec = spec.and(PetSpecifications.nameContains(search));
        }
        if (species != null && !species.isBlank()) {
            spec = spec.and(PetSpecifications.hasSpecies(species));
        }
        if (ownerId != null) {
            spec = spec.and(PetSpecifications.hasOwnerId(ownerId));
        }
        if (active != null) {
            spec = spec.and(PetSpecifications.isArchived(!active));
        }

        return PageResponse.from(petRepository.findAll(spec, pageable).map(PetResponse::from));
    }

    public PetResponse getById(Long id) {
        return PetResponse.from(findPetOrThrow(id));
    }

    public PetResponse update(Long id, PetRequest request) {
        validateSpeciesBreedRule(request.species(), request.speciesNote());
        Pet pet = findPetOrThrow(id);
        Owner owner = findOwnerOrThrow(request.ownerId());

        pet.update(owner, request.name(), request.species(), request.breed(), request.speciesNote(),
                request.birthDate(), request.sex(), request.weightKg(), request.allergies(), request.chronicConditions());

        return PetResponse.from(petRepository.save(pet));
    }

    public PetResponse archive(Long id) {
        Pet pet = findPetOrThrow(id);
        pet.archive();

        return PetResponse.from(petRepository.save(pet));
    }

    public PetResponse activate(Long id) {
        Pet pet = findPetOrThrow(id);
        pet.activate();

        return PetResponse.from(petRepository.save(pet));
    }

    private void validateSpeciesBreedRule(String species, String speciesNote) {
        boolean isCatOrDog = SPECIES_WITH_BREED.contains(species.toUpperCase());
        if (!isCatOrDog && (speciesNote == null || speciesNote.isBlank())) {
            throw new BusinessRuleViolationException("speciesNote",
                    "speciesNote is required when species is not CAT or DOG");
        }
    }

    private Owner findOwnerOrThrow(Long ownerId) {
        return ownerRepository.findById(ownerId)
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found with id " + ownerId));
    }

    private Pet findPetOrThrow(Long id) {
        return petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id " + id));
    }
}
