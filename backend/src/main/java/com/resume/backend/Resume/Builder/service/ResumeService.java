package com.resume.backend.Resume.Builder.service;

import org.json.JSONObject;

import java.io.IOException;
import java.util.Map;

public interface ResumeService {
    Map<String, Object> generateResumeResponse(String userDescription) throws IOException;
}
