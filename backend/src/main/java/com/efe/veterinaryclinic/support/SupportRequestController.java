package com.efe.veterinaryclinic.support;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.security.CustomUserDetails;
import com.efe.veterinaryclinic.support.dto.SupportRequestCreateRequest;
import com.efe.veterinaryclinic.support.dto.SupportRequestResponse;
import com.efe.veterinaryclinic.support.dto.SupportRequestStatusUpdateRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/support-requests")
@Tag(name = "Support Requests", description = "Internal contact-support tickets")
public class SupportRequestController {

    private final SupportRequestService supportRequestService;

    public SupportRequestController(SupportRequestService supportRequestService) {
        this.supportRequestService = supportRequestService;
    }

    @PostMapping
    @Operation(summary = "Submit a support request", description = "ADMIN, VET, RECEPTIONIST. Notifies configured admin recipients by email (best-effort).")
    public ResponseEntity<SupportRequestResponse> create(@Valid @RequestBody SupportRequestCreateRequest request,
                                                          @AuthenticationPrincipal CustomUserDetails principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(supportRequestService.create(request, principal.getUser()));
    }

    @GetMapping
    @Operation(summary = "List support requests", description = "ADMIN, VET, RECEPTIONIST. ADMIN sees every request; VET/RECEPTIONIST see only their own.")
    public ResponseEntity<PageResponse<SupportRequestResponse>> list(Pageable pageable,
                                                                      @RequestParam(required = false) SupportRequestStatus status,
                                                                      @AuthenticationPrincipal CustomUserDetails principal) {
        return ResponseEntity.ok(supportRequestService.list(pageable, status, principal.getUser()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get support request detail", description = "ADMIN, VET, RECEPTIONIST. Non-admin users may only view their own request.")
    public ResponseEntity<SupportRequestResponse> getById(@PathVariable Long id,
                                                           @AuthenticationPrincipal CustomUserDetails principal) {
        return ResponseEntity.ok(supportRequestService.getById(id, principal.getUser()));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update a support request's status", description = "ADMIN only.")
    public ResponseEntity<SupportRequestResponse> updateStatus(@PathVariable Long id,
                                                                @Valid @RequestBody SupportRequestStatusUpdateRequest request) {
        return ResponseEntity.ok(supportRequestService.updateStatus(id, request));
    }
}
