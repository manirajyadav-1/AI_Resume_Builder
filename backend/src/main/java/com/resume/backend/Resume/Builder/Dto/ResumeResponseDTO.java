package com.resume.backend.Resume.Builder.Dto;

public class ResumeResponseDTO {
    private String contentJson;
    private String templateType;

    public ResumeResponseDTO(String contentJson, String templateType) {
        this.contentJson = contentJson;
        this.templateType = templateType;
    }

    public String getContentJson() {
        return contentJson;
    }

    public String getTemplateType() {
        return templateType;
    }
}
