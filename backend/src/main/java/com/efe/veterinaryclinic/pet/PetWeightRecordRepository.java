package com.efe.veterinaryclinic.pet;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetWeightRecordRepository extends JpaRepository<PetWeightRecord, Long> {

    List<PetWeightRecord> findByPet_IdOrderByRecordedAtAsc(Long petId);
}
