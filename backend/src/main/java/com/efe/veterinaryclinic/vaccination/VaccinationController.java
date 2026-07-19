package com.efe.veterinaryclinic.vaccination;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.vaccination.dto.VaccinationRequest;
import com.efe.veterinaryclinic.vaccination.dto.VaccinationResponse;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vaccinations")
@Tag(name = "Vaccinations", description = "Vaccination records")
public class VaccinationController {

    private final VaccinationService vaccinationService;

    public VaccinationController(VaccinationService vaccinationService) {
        this.vaccinationService = vaccinationService;
    }

    @PostMapping
    @Operation(summary = "Create a vaccination record", description = "ADMIN, VET. nextDueDate is calculated by the backend.")
    public ResponseEntity<VaccinationResponse> create(@Valid @RequestBody VaccinationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vaccinationService.create(request));
    }

    @GetMapping
    @Operation(summary = "List vaccinations", description = "ADMIN, VET, RECEPTIONIST.")
    public ResponseEntity<PageResponse<VaccinationResponse>> list(Pageable pageable) {
        return ResponseEntity.ok(vaccinationService.list(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get vaccination detail", description = "ADMIN, VET, RECEPTIONIST.")
    public ResponseEntity<VaccinationResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(vaccinationService.getById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a vaccination record", description = "ADMIN, VET.")
    public ResponseEntity<VaccinationResponse> update(@PathVariable Long id, @Valid @RequestBody VaccinationRequest request) {
        return ResponseEntity.ok(vaccinationService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a vaccination record", description = "ADMIN only.")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        vaccinationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
