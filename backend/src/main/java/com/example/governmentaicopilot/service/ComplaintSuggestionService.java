package com.example.governmentaicopilot.service;

import java.util.ArrayList;
import java.util.List;

public class ComplaintSuggestionService {

    public ComplaintSuggestionResponse generateSuggestion(ComplaintSuggestionRequest request) {
        String title = request.title() == null ? "Citizen complaint" : request.title().trim();
        String detail = request.detail() == null ? "" : request.detail().trim();
        String department = request.department() == null ? "General Services" : request.department().trim();

        String priority = inferPriority(detail, title);
        String recommendedAction = buildRecommendedAction(department, priority);
        List<String> nextSteps = buildNextSteps(department, priority);
        String officerMessage = buildOfficerMessage(department, priority, title, recommendedAction);

        return new ComplaintSuggestionResponse(title, department, priority, recommendedAction, nextSteps, officerMessage);
    }

    private String inferPriority(String detail, String title) {
        String combined = (title + " " + detail).toLowerCase();
        if (combined.contains("urgent") || combined.contains("no water") || combined.contains("outage") || combined.contains("emergency") || combined.contains("danger")) {
            return "High";
        }
        if (combined.contains("delay") || combined.contains("missing") || combined.contains("repeated")) {
            return "Medium";
        }
        return "Medium";
    }

    private String buildRecommendedAction(String department, String priority) {
        if ("High".equals(priority)) {
            return "Dispatch an officer to verify the incident, coordinate the relevant department, and prepare a rapid response plan for the affected citizens.";
        }
        return "Assign the case to the " + department + " team, review the complaint details, and create a documented follow-up plan for the citizen.";
    }

    private List<String> buildNextSteps(String department, String priority) {
        List<String> steps = new ArrayList<>();
        steps.add("Open the case in the officer dashboard and confirm the affected location.");
        steps.add("Review the complaint details and check whether supporting documents are attached.");
        steps.add("Coordinate with the " + department + " team and schedule the next action.");
        if ("High".equals(priority)) {
            steps.add("Escalate the case to a supervisor if the issue poses an immediate risk to residents.");
        }
        return steps;
    }

    private String buildOfficerMessage(String department, String priority, String title, String recommendedAction) {
        return "Officer alert: " + priority + " priority case for " + title + " in " + department + ". " + recommendedAction;
    }
}
