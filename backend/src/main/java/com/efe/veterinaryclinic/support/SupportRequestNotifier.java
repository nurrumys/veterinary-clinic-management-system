package com.efe.veterinaryclinic.support;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
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
 * The JavaMailSender bean itself is optional, since Spring Boot's mail autoconfiguration only
 * registers it when spring.mail.host is set (not the case in e.g. the h2 profile) — this component
 * must not stop the whole application from starting just because mail isn't configured.
 */
@Component
public class SupportRequestNotifier {

    private static final Logger log = LoggerFactory.getLogger(SupportRequestNotifier.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final boolean enabled;
    private final List<String> recipients;

    public SupportRequestNotifier(ObjectProvider<JavaMailSender> mailSenderProvider,
                                   @Value("${app.support.notifications.enabled:false}") boolean enabled,
                                   @Value("${app.support.notification-emails:}") String notificationEmailsCsv) {
        this.mailSenderProvider = mailSenderProvider;
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

        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
        if (mailSender == null) {
            log.warn("Support notifications are enabled but no JavaMailSender bean is configured " +
                    "(spring.mail.host missing) — skipping notification for request {}", supportRequest.getId());
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
