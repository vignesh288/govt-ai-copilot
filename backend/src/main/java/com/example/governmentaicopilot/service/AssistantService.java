package com.example.governmentaicopilot.service;

import org.springframework.stereotype.Service;

import com.example.governmentaicopilot.dto.AssistantRequest;
import com.example.governmentaicopilot.dto.AssistantResponse;

@Service
public class AssistantService {

    public AssistantResponse answer(AssistantRequest request) {
        String question = request.question() == null ? "" : request.question().trim().toLowerCase();
        String language = request.language() == null || request.language().isBlank() ? "English" : request.language();

        String answer;
        if (question.contains("housing") || question.contains("subsidy") || question.contains("scheme")) {
            answer = "To apply for a housing subsidy, check if you meet the eligibility criteria, gather the required documents, and submit the completed application form through the citizen services portal. If you need help, use the Schemes Search tab to compare programs and view the required supporting documents.";
        } else if (question.contains("grievance") || question.contains("complaint") || question.contains("status")) {
            answer = "You can submit a grievance in the Grievance tab and then track its progress in the Officer Console or your citizen dashboard. Grievances are triaged by department and updated with a status once an officer reviews the case.";
        } else if (question.contains("document") || question.contains("upload") || question.contains("evidence")) {
            answer = "Upload your documents in the Document Assist tab. Supported files include PDF, JPG, PNG, and scanned forms. The portal will summarize the documents and tell you what is missing for your application or grievance.";
        } else if (question.contains("login") || question.contains("verify") || question.contains("otp") || question.contains("two-factor") || question.contains("2fa")) {
            answer = "Use your registered mobile number to receive an OTP, then complete the secure sign-in flow. For added safety, the portal supports two-factor authentication and consent dialogs before sensitive actions.";
        } else {
            answer = "I can help with citizen service guidance, scheme searches, grievance submission, and document assistance. Please ask a specific question about the service you need or the next step you want to complete.";
        }

        return new AssistantResponse(answer, "Portal guidance", language);
    }
}
