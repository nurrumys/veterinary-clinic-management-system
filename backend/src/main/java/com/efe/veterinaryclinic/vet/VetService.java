package com.efe.veterinaryclinic.vet;

import com.efe.veterinaryclinic.common.dto.PageResponse;
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
        Vet vet = new Vet(request.name(), request.specialty(), request.licenseNo(), request.workHours());
        Vet saved = vetRepository.save(vet);

        return VetResponse.from(saved);
    }

    public PageResponse<VetResponse> list(Pageable pageable) {
        return PageResponse.from(vetRepository.findAll(pageable).map(VetResponse::from));
    }
}
