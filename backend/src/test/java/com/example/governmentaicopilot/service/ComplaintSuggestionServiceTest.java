package com.example.governmentaicopilot.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class ComplaintSuggestionServiceTest {

    @Test
    void returnsOfficerReadyActionPlan() {
        ComplaintSuggestionService service = new ComplaintSuggestionService();

        ComplaintSuggestionResponse response = service.generateSuggestion(
            new ComplaintSuggestionRequest(
                "Water supply outage",
                "Several homes in the district have no water for three days and residents are asking for urgent help.",
                "Housing & Development"
            )
        );

        assertEquals("High", response.priority());
        assertTrue(response.recommendedAction().toLowerCase().contains("dispatch"));
        assertTrue(response.nextSteps().size() >= 3);
        assertTrue(response.officerMessage().contains("Officer"));
    }
}
