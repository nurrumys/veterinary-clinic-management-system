package com.efe.veterinaryclinic.vaccination;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.vaccination.dto.VaccinationRequest;
import com.efe.veterinaryclinic.vaccination.dto.VaccinationResponse;
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
public class VaccinationController {

    private final VaccinationService vaccinationService;

    public VaccinationController(VaccinationService vaccinationService) {
        this.vaccinationService = vaccinationService;
    }

    @PostMapping
    public ResponseEntity<VaccinationResponse> create(@Valid @RequestBody VaccinationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vaccinationService.create(request));
    }

    @GetMapping
    public ResponseEntity<PageResponse<VaccinationResponse>> list(Pageable pageable) {
        return ResponseEntity.ok(vaccinationService.list(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VaccinationResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(vaccinationService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VaccinationResponse> update(@PathVariable Long id, @Valid @RequestBody VaccinationRequest request) {
        return ResponseEntity.ok(vaccinationService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        vaccinationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
