package com.example.governmentaicopilot.repository;

import com.example.governmentaicopilot.entity.Complaint;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByDepartment(String department);
    List<Complaint> findByStatus(String status);
}
