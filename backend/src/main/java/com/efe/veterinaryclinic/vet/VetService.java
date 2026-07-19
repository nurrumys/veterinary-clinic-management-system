package com.efe.veterinaryclinic.vet;

import com.efe.veterinaryclinic.common.dto.PageResponse;
import com.efe.veterinaryclinic.common.exception.ConflictException;
import com.efe.veterinaryclinic.common.exception.ResourceNotFoundException;
import com.efe.veterinaryclinic.invoice.Invoice;
import com.efe.veterinaryclinic.invoice.InvoiceRepository;
import com.efe.veterinaryclinic.invoice.InvoiceStatus;
import com.efe.veterinaryclinic.vet.dto.VetPerformanceResponse;
import com.efe.veterinaryclinic.vet.dto.VetRequest;
import com.efe.veterinaryclinic.vet.dto.VetResponse;
import com.efe.veterinaryclinic.visit.VisitRepository;
import com.efe.veterinaryclinic.visit.VisitStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class VetService {

    private static final int CURRENCY_SCALE = 2;

    private final VetRepository vetRepository;
    private final VisitRepository visitRepository;
    private final InvoiceRepository invoiceRepository;

    public VetService(VetRepository vetRepository, VisitRepository visitRepository,
                       InvoiceRepository invoiceRepository) {
        this.vetRepository = vetRepository;
        this.visitRepository = visitRepository;
        this.invoiceRepository = invoiceRepository;
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

    public VetPerformanceResponse getPerformance(Long id) {
        Vet vet = findOrThrow(id);

        LocalDate today = LocalDate.now();
        LocalDateTime yearStart = today.withDayOfYear(1).atStartOfDay();
        LocalDateTime windowEnd = today.plusDays(1).atStartOfDay();
        LocalDateTime now = LocalDateTime.now();

        long totalVisitsYtd = visitRepository.countByVet_IdAndScheduledAtBetween(id, yearStart, windowEnd);
        long completedVisitsYtd = visitRepository.countByVet_IdAndStatusAndScheduledAtBetween(
                id, VisitStatus.COMPLETED, yearStart, windowEnd);
        long cancelledVisitsYtd = visitRepository.countByVet_IdAndStatusAndScheduledAtBetween(
                id, VisitStatus.CANCELLED, yearStart, windowEnd);
        long upcomingVisits = visitRepository.countByVet_IdAndStatusNotAndScheduledAtGreaterThanEqual(
                id, VisitStatus.CANCELLED, now);

        BigDecimal revenueGeneratedYtd = invoiceRepository
                .findByStatusAndVisit_Vet_IdAndIssuedAtGreaterThanEqual(InvoiceStatus.PAID, id, yearStart).stream()
                .map(Invoice::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(CURRENCY_SCALE, RoundingMode.HALF_UP);

        return new VetPerformanceResponse(vet.getId(), vet.getName(), totalVisitsYtd, completedVisitsYtd,
                cancelledVisitsYtd, upcomingVisits, revenueGeneratedYtd);
    }

    private Vet findOrThrow(Long id) {
        return vetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vet not found with id " + id));
    }
}
