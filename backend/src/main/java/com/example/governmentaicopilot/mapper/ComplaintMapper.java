package com.example.governmentaicopilot.mapper;

import com.example.governmentaicopilot.dto.ComplaintRequest;
import com.example.governmentaicopilot.dto.ComplaintResponse;
import com.example.governmentaicopilot.entity.Complaint;
import org.springframework.stereotype.Component;

@Component
public class ComplaintMapper {

    public Complaint toEntity(ComplaintRequest request) {
        Complaint complaint = new Complaint();
        complaint.setCitizenName(request.citizenName());
        complaint.setTitle(request.title());
        complaint.setDescription(request.description());
        complaint.setDepartment(request.department());
        complaint.setPriority(request.priority() != null ? request.priority() : "Medium");
        complaint.setStatus("Submitted");
        return complaint;
    }

    public ComplaintResponse toResponse(Complaint complaint) {
        return new ComplaintResponse(
            complaint.getId(),
            complaint.getCitizenName(),
            complaint.getTitle(),
            complaint.getDescription(),
            complaint.getDepartment(),
            complaint.getPriority(),
            complaint.getStatus(),
            complaint.getAiSummary(),
            complaint.getSuggestedReply(),
            complaint.getAssignedOfficer(),
            complaint.getCreatedAt(),
            complaint.getUpdatedAt()
        );
    }
}
