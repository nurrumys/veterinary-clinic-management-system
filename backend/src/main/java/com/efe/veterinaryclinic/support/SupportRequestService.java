package com.efe.veterinaryclinic.support;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.common.exception.ResourceNotFoundException;
import com.efe.veterinaryclinic.security.Role;
import com.efe.veterinaryclinic.security.User;
import com.efe.veterinaryclinic.support.dto.SupportRequestCreateRequest;
import com.efe.veterinaryclinic.support.dto.SupportRequestResponse;
import com.efe.veterinaryclinic.support.dto.SupportRequestStatusUpdateRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class SupportRequestService {

    private final SupportRequestRepository supportRequestRepository;
    private final SupportRequestNotifier supportRequestNotifier;

    public SupportRequestService(SupportRequestRepository supportRequestRepository,
                                  SupportRequestNotifier supportRequestNotifier) {
        this.supportRequestRepository = supportRequestRepository;
        this.supportRequestNotifier = supportRequestNotifier;
    }

    public SupportRequestResponse create(SupportRequestCreateRequest request, User requester) {
        SupportRequest supportRequest = new SupportRequest(requester, request.subject(), request.message());
        SupportRequest saved = supportRequestRepository.save(supportRequest);

        supportRequestNotifier.notifyNewRequest(saved);

        return SupportRequestResponse.from(saved);
    }

    public PageResponse<SupportRequestResponse> list(Pageable pageable, SupportRequestStatus statusFilter, User currentUser) {
        if (currentUser.getRole() == Role.ADMIN) {
            if (statusFilter != null) {
                return PageResponse.from(supportRequestRepository.findByStatus(statusFilter, pageable)
                        .map(SupportRequestResponse::from));
            }
            return PageResponse.from(supportRequestRepository.findAll(pageable).map(SupportRequestResponse::from));
        }

        if (statusFilter != null) {
            return PageResponse.from(supportRequestRepository
                    .findByRequestedBy_IdAndStatus(currentUser.getId(), statusFilter, pageable)
                    .map(SupportRequestResponse::from));
        }
        return PageResponse.from(supportRequestRepository.findByRequestedBy_Id(currentUser.getId(), pageable)
                .map(SupportRequestResponse::from));
    }

    public SupportRequestResponse getById(Long id, User currentUser) {
        SupportRequest supportRequest = findOrThrow(id);

        if (currentUser.getRole() != Role.ADMIN && !supportRequest.getRequestedBy().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Cannot view another user's support request");
        }

        return SupportRequestResponse.from(supportRequest);
    }

    public SupportRequestResponse updateStatus(Long id, SupportRequestStatusUpdateRequest request) {
        SupportRequest supportRequest = findOrThrow(id);
        supportRequest.updateStatus(request.status(), request.adminResponse());

        return SupportRequestResponse.from(supportRequestRepository.save(supportRequest));
    }

    private SupportRequest findOrThrow(Long id) {
        return supportRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Support request not found with id " + id));
    }
}
