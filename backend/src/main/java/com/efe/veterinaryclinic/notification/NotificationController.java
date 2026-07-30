package com.efe.veterinaryclinic.notification;

import com.efe.veterinaryclinic.notification.dto.NotificationResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
@Tag(name = "Notifications", description = "Upcoming appointments, vaccinations due today, and recently created records")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    @Operation(summary = "Get notifications", description = "ADMIN, VET, RECEPTIONIST. Appointments starting within "
            + "the next 2 hours, vaccinations due today, and owners/pets/visits created within the last 24 hours.")
    public ResponseEntity<NotificationResponse> getNotifications() {
        return ResponseEntity.ok(notificationService.getNotifications());
    }
}
