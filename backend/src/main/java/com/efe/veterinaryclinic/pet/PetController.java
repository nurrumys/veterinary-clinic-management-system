package com.efe.veterinaryclinic.pet;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.pet.dto.PetRequest;
import com.efe.veterinaryclinic.pet.dto.PetResponse;
import com.efe.veterinaryclinic.pet.dto.PetWeightRecordRequest;
import com.efe.veterinaryclinic.pet.dto.PetWeightRecordResponse;
import com.efe.veterinaryclinic.vaccination.VaccinationService;
import com.efe.veterinaryclinic.vaccination.dto.VaccinationResponse;
import com.efe.veterinaryclinic.visit.VisitService;
import com.efe.veterinaryclinic.visit.dto.VisitResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetController {


    private final PetService petService;
    private final VisitService visitService;
    private final VaccinationService vaccinationService;
    private final PetWeightRecordService petWeightRecordService;

    public PetController(PetService petService, VisitService visitService, VaccinationService vaccinationService,
                          PetWeightRecordService petWeightRecordService) {
        this.petService = petService;
        this.visitService = visitService;
        this.vaccinationService = vaccinationService;
        this.petWeightRecordService = petWeightRecordService;
    }

    @PostMapping
    public ResponseEntity<PetResponse> create(@Valid @RequestBody PetRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(petService.create(request));
    }

    @GetMapping
    public ResponseEntity<PageResponse<PetResponse>> list(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String species,
            @RequestParam(required = false) Long ownerId,
            @RequestParam(required = false) Boolean active,
            Pageable pageable) {
        return ResponseEntity.ok(petService.list(search, species, ownerId, active, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(petService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetResponse> update(@PathVariable Long id, @Valid @RequestBody PetRequest request) {
        return ResponseEntity.ok(petService.update(id, request));
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<PetResponse> archive(@PathVariable Long id) {
        return ResponseEntity.ok(petService.archive(id));
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<PetResponse> activate(@PathVariable Long id) {
        return ResponseEntity.ok(petService.activate(id));
    }

    @GetMapping("/{id}/visits")
    public ResponseEntity<PageResponse<VisitResponse>> visits(@PathVariable Long id, Pageable pageable) {
        return ResponseEntity.ok(visitService.listByPet(id, pageable));
    }

    @GetMapping("/{id}/vaccinations")
    public ResponseEntity<PageResponse<VaccinationResponse>> vaccinations(@PathVariable Long id, Pageable pageable) {
        return ResponseEntity.ok(vaccinationService.listByPet(id, pageable));
    }

    @PostMapping("/{id}/weight-records")
    public ResponseEntity<PetWeightRecordResponse> addWeightRecord(@PathVariable Long id,
                                                                     @Valid @RequestBody PetWeightRecordRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(petWeightRecordService.create(id, request));
    }

    @GetMapping("/{id}/weight-records")
    public ResponseEntity<List<PetWeightRecordResponse>> weightRecords(@PathVariable Long id) {
        return ResponseEntity.ok(petWeightRecordService.listByPet(id));
    }
}
