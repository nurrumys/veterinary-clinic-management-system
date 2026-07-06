package com.efe.veterinaryclinic.auth;

import com.efe.veterinaryclinic.auth.dto.AuthResponse;
import com.efe.veterinaryclinic.auth.dto.LoginRequest;
import com.efe.veterinaryclinic.auth.dto.RegisterRequest;
import com.efe.veterinaryclinic.auth.dto.UserSummaryResponse;
import com.efe.veterinaryclinic.common.exception.ConflictException;
import com.efe.veterinaryclinic.security.JwtService;
import com.efe.veterinaryclinic.security.User;
import com.efe.veterinaryclinic.security.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                        JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public UserSummaryResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new ConflictException("A user with email " + request.email() + " already exists");
        }

        User user = new User(request.fullName(), request.email(),
                passwordEncoder.encode(request.password()), request.role());
        User saved = userRepository.save(user);

        return toSummary(saved);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found: " + request.email()));

        return new AuthResponse(jwtService.generateToken(user.getEmail(), user.getRole().name()), toSummary(user));
    }

    public UserSummaryResponse toSummary(User user) {
        return new UserSummaryResponse(user.getId(), user.getFullName(), user.getEmail(), user.getRole());
    }
}
