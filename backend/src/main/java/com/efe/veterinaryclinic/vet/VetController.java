package com.efe.veterinaryclinic.vet;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.vet.dto.VetRequest;
import com.efe.veterinaryclinic.vet.dto.VetResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vets")
public class VetController {

    private final VetService vetService;

    public VetController(VetService vetService) {
        this.vetService = vetService;
    }

    @PostMapping
    public ResponseEntity<VetResponse> create(@Valid @RequestBody VetRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vetService.create(request));
    }

    @GetMapping
    public ResponseEntity<PageResponse<VetResponse>> list(Pageable pageable) {
        return ResponseEntity.ok(vetService.list(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VetResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(vetService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VetResponse> update(@PathVariable Long id, @Valid @RequestBody VetRequest request) {
        return ResponseEntity.ok(vetService.update(id, request));
    }
}
