package com.example.governmentaicopilot.dto;

import jakarta.validation.constraints.NotBlank;

public record ComplaintRequest(
    @NotBlank String citizenName,
    @NotBlank String title,
    @NotBlank String description,
    @NotBlank String department,
    String priority,
    String language
) {}
