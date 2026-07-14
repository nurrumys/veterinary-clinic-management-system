package com.efe.veterinaryclinic.owner;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.owner.dto.OwnerDetailResponse;
import com.efe.veterinaryclinic.owner.dto.OwnerRequest;
import com.efe.veterinaryclinic.owner.dto.OwnerResponse;
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
public class OwnerController {

    private final OwnerService ownerService;

    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @PostMapping
    public ResponseEntity<OwnerResponse> create(@Valid @RequestBody OwnerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ownerService.create(request));
    }

    @GetMapping
    public ResponseEntity<PageResponse<OwnerResponse>> list(
            @RequestParam(required = false) String search, Pageable pageable) {
        return ResponseEntity.ok(ownerService.list(search, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OwnerDetailResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ownerService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OwnerResponse> update(@PathVariable Long id, @Valid @RequestBody OwnerRequest request) {
        return ResponseEntity.ok(ownerService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ownerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
