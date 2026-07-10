package com.efe.veterinaryclinic.vaccination;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccinationRepository extends JpaRepository<Vaccination, Long> {

    Page<Vaccination> findByPet_Id(Long petId, Pageable pageable);
}
