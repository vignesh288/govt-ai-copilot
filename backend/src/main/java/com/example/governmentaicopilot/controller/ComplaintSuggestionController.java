package com.example.governmentaicopilot.controller;

import com.example.governmentaicopilot.service.ComplaintSuggestionRequest;
import com.example.governmentaicopilot.service.ComplaintSuggestionResponse;
import com.example.governmentaicopilot.service.ComplaintSuggestionService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ComplaintSuggestionController {

    private final ComplaintSuggestionService complaintSuggestionService = new ComplaintSuggestionService();

    @PostMapping("/api/complaints/suggest")
    public ComplaintSuggestionResponse suggest(@RequestBody ComplaintSuggestionRequest request) {
        return complaintSuggestionService.generateSuggestion(request);
    }
}
