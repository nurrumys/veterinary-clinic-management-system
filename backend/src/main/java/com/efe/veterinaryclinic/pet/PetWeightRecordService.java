package com.efe.veterinaryclinic.pet;

import com.efe.veterinaryclinic.common.exception.ResourceNotFoundException;
import com.efe.veterinaryclinic.pet.dto.PetWeightRecordRequest;
import com.efe.veterinaryclinic.pet.dto.PetWeightRecordResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetWeightRecordService {

    private final PetWeightRecordRepository petWeightRecordRepository;
    private final PetRepository petRepository;

    public PetWeightRecordService(PetWeightRecordRepository petWeightRecordRepository, PetRepository petRepository) {
        this.petWeightRecordRepository = petWeightRecordRepository;
        this.petRepository = petRepository;
    }

    public PetWeightRecordResponse create(Long petId, PetWeightRecordRequest request) {
        Pet pet = findPetOrThrow(petId);

        PetWeightRecord record = new PetWeightRecord(pet, request.weightKg(), request.recordedAt(), request.note());
        PetWeightRecord saved = petWeightRecordRepository.save(record);

        return PetWeightRecordResponse.from(saved);
    }

    public List<PetWeightRecordResponse> listByPet(Long petId) {
        findPetOrThrow(petId);

        return petWeightRecordRepository.findByPet_IdOrderByRecordedAtAsc(petId).stream()
                .map(PetWeightRecordResponse::from)
                .toList();
    }

    private Pet findPetOrThrow(Long petId) {
        return petRepository.findById(petId)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with id " + petId));
    }
}
