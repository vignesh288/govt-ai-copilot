package com.example.governmentaicopilot.service;

import java.util.List;

public record ComplaintSuggestionResponse(
    String title,
    String department,
    String priority,
    String recommendedAction,
    List<String> nextSteps,
    String officerMessage
) {
}
