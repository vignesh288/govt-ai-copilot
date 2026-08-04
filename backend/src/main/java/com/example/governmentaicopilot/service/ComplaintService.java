package com.example.governmentaicopilot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.governmentaicopilot.dto.ComplaintRequest;
import com.example.governmentaicopilot.dto.ComplaintResponse;
import com.example.governmentaicopilot.entity.Complaint;
import com.example.governmentaicopilot.exception.ApiException;
import com.example.governmentaicopilot.mapper.ComplaintMapper;
import com.example.governmentaicopilot.repository.ComplaintRepository;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final ComplaintMapper complaintMapper;

    public ComplaintService(ComplaintRepository complaintRepository, ComplaintMapper complaintMapper) {
        this.complaintRepository = complaintRepository;
        this.complaintMapper = complaintMapper;
    }

    public ComplaintResponse createComplaint(ComplaintRequest request) {
        Complaint complaint = complaintMapper.toEntity(request);
        complaint.setAiSummary(buildAiSummary(request));
        complaint.setSuggestedReply(buildSuggestedReply(request));
        return complaintMapper.toResponse(complaintRepository.save(complaint));
    }

    public List<ComplaintResponse> listComplaints() {
        return complaintRepository.findAll().stream().map(complaintMapper::toResponse).toList();
    }

    public ComplaintResponse getComplaint(Long id) {
        Complaint complaint = complaintRepository.findById(id)
            .orElseThrow(() -> new ApiException("Complaint not found"));
        return complaintMapper.toResponse(complaint);
    }

    public ComplaintResponse updateStatus(Long id, String status) {
        Complaint complaint = complaintRepository.findById(id)
            .orElseThrow(() -> new ApiException("Complaint not found"));
        complaint.setStatus(status);
        return complaintMapper.toResponse(complaintRepository.save(complaint));
    }

    private String buildAiSummary(ComplaintRequest request) {
        return "AI classified this as a " + request.department() + " matter with " + (request.priority() != null ? request.priority() : "Medium") + " priority.";
    }

    private String buildSuggestedReply(ComplaintRequest request) {
        return "Thank you for raising this concern. We are reviewing your request under the " + request.department() + " department and will share an update shortly.";
    }
}
