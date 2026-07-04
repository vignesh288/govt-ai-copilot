package com.example.governmentaicopilot.service;

public class ComplaintRoutingService {

    public ComplaintRoutingResult route(String title, String detail, String language) {
        String normalizedTitle = title == null ? "" : title.toLowerCase();
        String normalizedDetail = detail == null ? "" : detail.toLowerCase();
        String normalizedLanguage = language == null ? "English" : language;

        String department;
        String priority;
        String officerAction;

        if (normalizedTitle.contains("water") || normalizedDetail.contains("water") || normalizedTitle.contains("sanitation") || normalizedDetail.contains("sanitation")) {
            department = "Water & Sanitation";
            priority = "High";
            officerAction = "Dispatch an inspector and open a rapid response case.";
        } else if (normalizedTitle.contains("health") || normalizedDetail.contains("health") || normalizedTitle.contains("hospital") || normalizedDetail.contains("hospital")) {
            department = "Health Services";
            priority = "High";
            officerAction = "Escalate to medical services and notify the duty officer.";
        } else if (normalizedTitle.contains("transport") || normalizedDetail.contains("transport") || normalizedTitle.contains("road") || normalizedDetail.contains("road")) {
            department = "Transport & Roads";
            priority = "Medium";
            officerAction = "Assign a field officer to inspect the issue.";
        } else {
            department = "General Services";
            priority = "Medium";
            officerAction = "Assign the complaint to the relevant desk and monitor progress.";
        }

        return new ComplaintRoutingResult(department, priority, officerAction, normalizedLanguage);
    }
}
