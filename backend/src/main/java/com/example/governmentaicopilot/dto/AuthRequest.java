package com.example.governmentaicopilot.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AuthRequest(
    @NotBlank String username,
    @NotBlank String password,
    @Email String email,
    String fullName,
    String roleName
) {}
