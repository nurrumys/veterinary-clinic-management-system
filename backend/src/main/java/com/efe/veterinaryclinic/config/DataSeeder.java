package com.efe.veterinaryclinic.config;

import com.efe.veterinaryclinic.security.Role;
import com.efe.veterinaryclinic.security.User;
import com.efe.veterinaryclinic.security.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String adminEmail;
    private final String adminPassword;
    private final String vet1Email;
    private final String vet1Password;
    private final String vet2Email;
    private final String vet2Password;
    private final String receptionistEmail;
    private final String receptionistPassword;

    public DataSeeder(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       @Value("${app.seed.admin.email}") String adminEmail,
                       @Value("${app.seed.admin.password}") String adminPassword,
                       @Value("${app.seed.vet1.email}") String vet1Email,
                       @Value("${app.seed.vet1.password}") String vet1Password,
                       @Value("${app.seed.vet2.email}") String vet2Email,
                       @Value("${app.seed.vet2.password}") String vet2Password,
                       @Value("${app.seed.receptionist.email}") String receptionistEmail,
                       @Value("${app.seed.receptionist.password}") String receptionistPassword) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
        this.vet1Email = vet1Email;
        this.vet1Password = vet1Password;
        this.vet2Email = vet2Email;
        this.vet2Password = vet2Password;
        this.receptionistEmail = receptionistEmail;
        this.receptionistPassword = receptionistPassword;
    }

    @Override
    public void run(String... args) {
        seedIfMissing(adminEmail, "Clinic Admin", adminPassword, Role.ADMIN);
        seedIfMissing(vet1Email, "Ahmet Yildiz", vet1Password, Role.VET);
        seedIfMissing(vet2Email, "Elif Sahin", vet2Password, Role.VET);
        seedIfMissing(receptionistEmail, "Clinic Receptionist", receptionistPassword, Role.RECEPTIONIST);
    }

    private void seedIfMissing(String email, String fullName, String rawPassword, Role role) {
        if (userRepository.findByEmail(email).isPresent()) {
            return;
        }
        userRepository.save(new User(fullName, email, passwordEncoder.encode(rawPassword), role));
    }
}
