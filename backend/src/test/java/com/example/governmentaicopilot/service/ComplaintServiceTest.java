package com.example.governmentaicopilot.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.example.governmentaicopilot.dto.ComplaintResponse;
import com.example.governmentaicopilot.entity.Complaint;
import com.example.governmentaicopilot.mapper.ComplaintMapper;
import com.example.governmentaicopilot.repository.ComplaintRepository;

class ComplaintServiceTest {

    @Test
    void updateStatusChangesComplaintState() {
        ComplaintRepository repository = mock(ComplaintRepository.class);
        ComplaintMapper mapper = new ComplaintMapper();
        ComplaintService service = new ComplaintService(repository, mapper);

        Complaint complaint = new Complaint("Citizen", "Water issue", "No water", "Water & Sanitation", "High", "Submitted");
        complaint.setId(10L);
        @SuppressWarnings("null")
        Optional<Complaint> optionalComplaint = Optional.of(complaint);
        when(repository.findById(10L)).thenReturn(optionalComplaint);
        @SuppressWarnings("unchecked")
        Optional<Complaint> savedAnswer = (Optional<Complaint>) Optional.of(complaint);
        when(repository.save(any(Complaint.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ComplaintResponse response = service.updateStatus(10L, "In Review");

        assertEquals("In Review", response.status());
        assertEquals("In Review", complaint.getStatus());
    }
}
