package com.efe.veterinaryclinic.auth;

import com.efe.veterinaryclinic.auth.dto.AuthResponse;
import com.efe.veterinaryclinic.auth.dto.LoginRequest;
import com.efe.veterinaryclinic.auth.dto.RegisterRequest;
import com.efe.veterinaryclinic.auth.dto.UserSummaryResponse;
import com.efe.veterinaryclinic.security.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserSummaryResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserSummaryResponse> me(@AuthenticationPrincipal CustomUserDetails principal) {
        return ResponseEntity.ok(authService.toSummary(principal.getUser()));
    }
}
