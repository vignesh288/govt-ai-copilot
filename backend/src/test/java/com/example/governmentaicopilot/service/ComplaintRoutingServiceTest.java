package com.example.governmentaicopilot.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class ComplaintRoutingServiceTest {

    @Test
    void routesUrgentWaterIssuesToTheCorrectDepartment() {
        ComplaintRoutingService service = new ComplaintRoutingService();

        ComplaintRoutingResult result = service.route("Water supply outage", "No water in several homes for three days", "Citizen");

        assertEquals("Water & Sanitation", result.department());
        assertEquals("High", result.priority());
        assertTrue(result.officerAction().toLowerCase().contains("dispatch"));
    }
}
