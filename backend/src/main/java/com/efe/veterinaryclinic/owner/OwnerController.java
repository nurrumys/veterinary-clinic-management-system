package com.efe.veterinaryclinic.owner;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.owner.dto.OwnerDetailResponse;
import com.efe.veterinaryclinic.owner.dto.OwnerRequest;
import com.efe.veterinaryclinic.owner.dto.OwnerResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/owners")
@Tag(name = "Owners", description = "Pet owner records")
public class OwnerController {

    private final OwnerService ownerService;

    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @PostMapping
    @Operation(summary = "Create an owner", description = "ADMIN, RECEPTIONIST.")
    public ResponseEntity<OwnerResponse> create(@Valid @RequestBody OwnerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ownerService.create(request));
    }

    @GetMapping
    @Operation(summary = "List owners", description = "ADMIN, VET, RECEPTIONIST. Supports name search and pagination.")
    public ResponseEntity<PageResponse<OwnerResponse>> list(
            @RequestParam(required = false) String search, Pageable pageable) {
        return ResponseEntity.ok(ownerService.list(search, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get owner detail", description = "ADMIN, VET, RECEPTIONIST. Includes the owner's pets and pet count.")
    public ResponseEntity<OwnerDetailResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ownerService.getById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an owner", description = "ADMIN, RECEPTIONIST.")
    public ResponseEntity<OwnerResponse> update(@PathVariable Long id, @Valid @RequestBody OwnerRequest request) {
        return ResponseEntity.ok(ownerService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an owner", description = "ADMIN only. Rejected with 409 if the owner still has pets.")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ownerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
