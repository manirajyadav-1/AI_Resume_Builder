package com.resume.backend.Resume.Builder.controller;

import com.resume.backend.Resume.Builder.ResumeRequest;
import com.resume.backend.Resume.Builder.service.ResumeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/resume/")
public class ResumeController {

    private ResumeService resumeService;

    public ResumeController(ResumeService resumeService){
        this.resumeService = resumeService;
    }

    @PostMapping("/generate")
    public ResponseEntity< Map<String, Object>> getResumeData(@RequestBody ResumeRequest resumeRequest) throws IOException {
        Map<String, Object> jsonObject = resumeService.generateResumeResponse(resumeRequest.userDescription());
        return new ResponseEntity<>(jsonObject, HttpStatus.OK);
    }

}
