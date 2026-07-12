package com.efe.veterinaryclinic.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ResetPasswordRequest(
        @NotBlank(message = "must not be blank")
        @Size(min = 8, message = "must be at least 8 characters")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\p{Punct}).*$",
                message = "must contain at least one uppercase letter, one lowercase letter, one digit, and one punctuation character")
        String newPassword
) {
}
