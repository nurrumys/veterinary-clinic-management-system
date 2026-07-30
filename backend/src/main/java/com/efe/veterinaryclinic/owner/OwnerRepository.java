package com.efe.veterinaryclinic.owner;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDateTime;
import java.util.List;

public interface OwnerRepository extends JpaRepository<Owner, Long>, JpaSpecificationExecutor<Owner> {

    List<Owner> findByCreatedAtGreaterThanEqual(LocalDateTime since);
}
