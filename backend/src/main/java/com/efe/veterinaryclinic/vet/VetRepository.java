package com.efe.veterinaryclinic.vet;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VetRepository extends JpaRepository<Vet, Long> {

    boolean existsByLicenseNo(String licenseNo);

    boolean existsByLicenseNoAndIdNot(String licenseNo, Long id);

    List<Vet> findByActiveTrue();
}
