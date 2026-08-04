package com.example.governmentaicopilot.dto;

import java.time.Instant;

public record ComplaintResponse(
    Long id,
    String citizenName,
    String title,
    String description,
    String department,
    String priority,
    String status,
    String aiSummary,
    String suggestedReply,
    String assignedOfficer,
    Instant createdAt,
    Instant updatedAt
) {}
