package com.efe.veterinaryclinic.vet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface VetRepository extends JpaRepository<Vet, Long> {

    boolean existsByLicenseNo(String licenseNo);

    boolean existsByLicenseNoAndIdNot(String licenseNo, Long id);

    List<Vet> findByActiveTrue();

    long countByActiveTrue();

    long countByCreatedAtGreaterThanEqual(LocalDateTime since);

    @Query("SELECT COUNT(DISTINCT v.specialty) FROM Vet v")
    long countDistinctSpecialty();
}
