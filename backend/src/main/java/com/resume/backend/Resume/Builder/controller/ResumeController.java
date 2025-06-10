package com.resume.backend.Resume.Builder.controller;

import com.resume.backend.Resume.Builder.ResumeRequest;
import com.resume.backend.Resume.Builder.service.ResumeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/resume")
public class ResumeController {

    final private ResumeService resumeService;

    public ResumeController(ResumeService resumeService){
        this.resumeService = resumeService;
    }

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> getResumeData(@RequestBody ResumeRequest resumeRequest) {
        try {
            Map<String, Object> jsonObject = resumeService.generateResumeResponse(resumeRequest.userDescription());
            return new ResponseEntity<>(jsonObject, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(Map.of("error", "Failed to generate resume. Please try again later."),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/success")
    public ResponseEntity<String> loginSuccess(@AuthenticationPrincipal OAuth2User principal){
        return ResponseEntity.ok(principal.getAttribute("email"));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.getSession().invalidate();
        response.setHeader("Set-Cookie", "JSESSIONID=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure");

        return ResponseEntity.ok("Logged out successfully");
    }
}
