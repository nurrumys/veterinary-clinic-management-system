package com.efe.veterinaryclinic.support;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

/**
 * Best-effort email notification when a new support ticket is created.
 * Never allowed to fail or delay ticket creation: any error here is caught and logged, not propagated.
 */
@Component
public class SupportRequestNotifier {

    private static final Logger log = LoggerFactory.getLogger(SupportRequestNotifier.class);

    private final JavaMailSender mailSender;
    private final boolean enabled;
    private final List<String> recipients;

    public SupportRequestNotifier(JavaMailSender mailSender,
                                   @Value("${app.support.notifications.enabled:false}") boolean enabled,
                                   @Value("${app.support.notification-emails:}") String notificationEmailsCsv) {
        this.mailSender = mailSender;
        this.enabled = enabled;
        this.recipients = Arrays.stream(notificationEmailsCsv.split(","))
                .map(String::trim)
                .filter(email -> !email.isEmpty())
                .toList();
    }

    public void notifyNewRequest(SupportRequest supportRequest) {
        if (!enabled || recipients.isEmpty()) {
            return;
        }

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(recipients.toArray(new String[0]));
            mailMessage.setSubject("[Vet Clinic] New support request: " + supportRequest.getSubject());
            mailMessage.setText(
                    "From: " + supportRequest.getRequestedBy().getFullName()
                            + " (" + supportRequest.getRequestedBy().getEmail() + ")\n\n"
                            + supportRequest.getMessage());
            mailSender.send(mailMessage);
        } catch (MailException ex) {
            log.warn("Failed to send support request notification email for request {}", supportRequest.getId(), ex);
        }
    }
}
