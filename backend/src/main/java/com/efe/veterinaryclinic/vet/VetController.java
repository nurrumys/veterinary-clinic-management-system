package com.efe.veterinaryclinic.vet;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.vet.dto.VetPerformanceResponse;
import com.efe.veterinaryclinic.vet.dto.VetRequest;
import com.efe.veterinaryclinic.vet.dto.VetResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Vets", description = "Veterinarian records and performance metrics")
public class VetController {

    private final VetService vetService;

    public VetController(VetService vetService) {
        this.vetService = vetService;
    }

    @PostMapping
    @Operation(summary = "Create a vet", description = "ADMIN only.")
    public ResponseEntity<VetResponse> create(@Valid @RequestBody VetRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vetService.create(request));
    }

    @GetMapping
    @Operation(summary = "List vets", description = "ADMIN, VET, RECEPTIONIST.")
    public ResponseEntity<PageResponse<VetResponse>> list(Pageable pageable) {
        return ResponseEntity.ok(vetService.list(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get vet detail", description = "ADMIN, VET, RECEPTIONIST.")
    public ResponseEntity<VetResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(vetService.getById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a vet", description = "ADMIN only.")
    public ResponseEntity<VetResponse> update(@PathVariable Long id, @Valid @RequestBody VetRequest request) {
        return ResponseEntity.ok(vetService.update(id, request));
    }

    @GetMapping("/{id}/performance")
    @Operation(summary = "Get vet performance metrics", description = "ADMIN only. Year-to-date visit counts and revenue generated.")
    public ResponseEntity<VetPerformanceResponse> performance(@PathVariable Long id) {
        return ResponseEntity.ok(vetService.getPerformance(id));
    }
}
