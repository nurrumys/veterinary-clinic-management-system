package com.efe.veterinaryclinic.support;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportRequestRepository extends JpaRepository<SupportRequest, Long> {

    Page<SupportRequest> findByStatus(SupportRequestStatus status, Pageable pageable);

    Page<SupportRequest> findByRequestedBy_Id(Long userId, Pageable pageable);

    Page<SupportRequest> findByRequestedBy_IdAndStatus(Long userId, SupportRequestStatus status, Pageable pageable);
}
