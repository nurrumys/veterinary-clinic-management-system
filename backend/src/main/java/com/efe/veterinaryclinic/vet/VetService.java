package com.efe.veterinaryclinic.vet;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.common.exception.ConflictException;
import com.efe.veterinaryclinic.common.exception.ResourceNotFoundException;
import com.efe.veterinaryclinic.vet.dto.VetRequest;
import com.efe.veterinaryclinic.vet.dto.VetResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class VetService {

    private final VetRepository vetRepository;

    public VetService(VetRepository vetRepository) {
        this.vetRepository = vetRepository;
    }

    public VetResponse create(VetRequest request) {
        if (vetRepository.existsByLicenseNo(request.licenseNo())) {
            throw new ConflictException("A vet with license number " + request.licenseNo() + " already exists");
        }

        Vet vet = new Vet(request.name(), request.specialty(), request.licenseNo(), request.workHours());
        Vet saved = vetRepository.save(vet);

        return VetResponse.from(saved);
    }

    public PageResponse<VetResponse> list(Pageable pageable) {
        return PageResponse.from(vetRepository.findAll(pageable).map(VetResponse::from));
    }

    public VetResponse getById(Long id) {
        return VetResponse.from(findOrThrow(id));
    }

    public VetResponse update(Long id, VetRequest request) {
        Vet vet = findOrThrow(id);
        if (vetRepository.existsByLicenseNoAndIdNot(request.licenseNo(), id)) {
            throw new ConflictException("A vet with license number " + request.licenseNo() + " already exists");
        }

        vet.update(request.name(), request.specialty(), request.licenseNo(), request.workHours());

        return VetResponse.from(vetRepository.save(vet));
    }

    private Vet findOrThrow(Long id) {
        return vetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vet not found with id " + id));
    }
}
