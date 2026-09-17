package com.example.governmentaicopilot.controller;

import com.example.governmentaicopilot.service.ComplaintRoutingResult;
import com.example.governmentaicopilot.service.ComplaintRoutingService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3100"})
public class RoutingController {

    private final ComplaintRoutingService routingService = new ComplaintRoutingService();

    @PostMapping("/api/complaints/route")
    public ComplaintRoutingResult route(@RequestBody Map<String, String> payload) {
        return routingService.route(payload.get("title"), payload.get("detail"), payload.get("language"));
    }
}
