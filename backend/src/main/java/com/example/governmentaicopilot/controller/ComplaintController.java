package com.example.governmentaicopilot.controller;

import com.example.governmentaicopilot.dto.ComplaintRequest;
import com.example.governmentaicopilot.dto.ComplaintResponse;
import com.example.governmentaicopilot.service.ComplaintService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3100"})
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping
    public ResponseEntity<ComplaintResponse> create(@Valid @RequestBody ComplaintRequest request) {
        return ResponseEntity.ok(complaintService.createComplaint(request));
    }

    @GetMapping
    public ResponseEntity<List<ComplaintResponse>> list() {
        return ResponseEntity.ok(complaintService.listComplaints());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComplaintResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(complaintService.getComplaint(id));
    }
}
