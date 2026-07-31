package com.efe.veterinaryclinic.vaccination;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface VaccinationRepository extends JpaRepository<Vaccination, Long> {

    Page<Vaccination> findByPet_Id(Long petId, Pageable pageable);

    long countByNextDueDateLessThanEqual(LocalDate date);

    long countByNextDueDateAfter(LocalDate date);

    long countByAdministeredAtBetween(LocalDateTime start, LocalDateTime end);

    List<Vaccination> findByNextDueDateLessThanEqualOrderByNextDueDateAsc(LocalDate date);

    List<Vaccination> findByNextDueDate(LocalDate date);

    @Query("SELECT COUNT(DISTINCT v.pet.id) FROM Vaccination v")
    long countDistinctPet();
}
