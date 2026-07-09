package com.efe.veterinaryclinic.visit;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDateTime;
import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long>, JpaSpecificationExecutor<Visit> {

    List<Visit> findByVet_IdAndStatusNotAndScheduledAtBetween(
            Long vetId, VisitStatus excludedStatus, LocalDateTime windowStart, LocalDateTime windowEnd);

    Page<Visit> findByPet_Id(Long petId, Pageable pageable);
}
