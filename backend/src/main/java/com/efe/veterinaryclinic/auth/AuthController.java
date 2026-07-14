package com.efe.veterinaryclinic.auth;

import com.efe.veterinaryclinic.auth.dto.AuthResponse;
import com.efe.veterinaryclinic.auth.dto.LoginRequest;
import com.efe.veterinaryclinic.auth.dto.RegisterRequest;
import com.efe.veterinaryclinic.auth.dto.ResetPasswordRequest;
import com.efe.veterinaryclinic.auth.dto.UserSummaryResponse;
import com.efe.veterinaryclinic.security.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "Login and account management")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "ADMIN only. Creates a login for a new receptionist or vet.")
    public ResponseEntity<UserSummaryResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/login")
    @SecurityRequirements
    @Operation(summary = "Log in", description = "Public. Exchanges email/password for a JWT.")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current user", description = "ADMIN, VET, RECEPTIONIST. Returns the authenticated user's profile.")
    public ResponseEntity<UserSummaryResponse> me(@AuthenticationPrincipal CustomUserDetails principal) {
        return ResponseEntity.ok(authService.toSummary(principal.getUser()));
    }

    @PatchMapping("/users/{id}/reset-password")
    @Operation(summary = "Reset a user's password", description = "ADMIN only. Sets a new password for the given user; no email or token flow.")
    public ResponseEntity<UserSummaryResponse> resetPassword(@PathVariable Long id,
                                                               @Valid @RequestBody ResetPasswordRequest request) {
        return ResponseEntity.ok(authService.resetPassword(id, request));
    }
}
