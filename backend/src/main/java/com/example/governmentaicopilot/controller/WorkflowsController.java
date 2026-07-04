package com.example.governmentaicopilot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class WorkflowsController {

    @GetMapping("/api/workflows")
    public List<Map<String, Object>> workflows() {
        return List.of(
            Map.of(
                "id", "WF-101",
                "title", "Permit renewal review",
                "department", "Housing & Development",
                "status", "In review",
                "priority", "High"
            ),
            Map.of(
                "id", "WF-102",
                "title", "Public benefits eligibility check",
                "department", "Social Services",
                "status", "Awaiting documents",
                "priority", "Medium"
            ),
            Map.of(
                "id", "WF-103",
                "title", "Policy update approval",
                "department", "Compliance Office",
                "status", "Approved",
                "priority", "Low"
            )
        );
    }
}
