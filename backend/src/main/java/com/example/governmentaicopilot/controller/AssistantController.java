package com.example.governmentaicopilot.controller;

import com.example.governmentaicopilot.dto.AssistantRequest;
import com.example.governmentaicopilot.dto.AssistantResponse;
import com.example.governmentaicopilot.service.AssistantService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3100"})
public class AssistantController {

    private final AssistantService assistantService;

    public AssistantController(AssistantService assistantService) {
        this.assistantService = assistantService;
    }

    @PostMapping("/api/assistant")
    public AssistantResponse assist(@RequestBody AssistantRequest request) {
        return assistantService.answer(request);
    }
}
