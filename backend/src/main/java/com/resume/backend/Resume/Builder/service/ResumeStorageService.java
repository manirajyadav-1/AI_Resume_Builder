package com.resume.backend.Resume.Builder.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.backend.Resume.Builder.Dto.ResumeDTO;
import com.resume.backend.Resume.Builder.model.Resume;
import com.resume.backend.Resume.Builder.model.User;
import com.resume.backend.Resume.Builder.respository.ResumeRepository;
import com.resume.backend.Resume.Builder.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ResumeStorageService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTService jwtService;

    public String saveOrUpdate(ResumeDTO resumeDTO, String authHeader, OAuth2User principal) {
        try {
            String email = null;

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                email = jwtService.extractUsername(token);
            }

            if ((email == null) || principal != null) {
                email = principal.getAttribute("email");
                System.out.println(email);
                if (email == null) {
                    email = principal.getAttribute("preferred_username");
                }
                if (email == null) {
                    email = principal.getAttribute("login");
                }
            }

            if (email == null || email.isEmpty()) {
                throw new RuntimeException("Unauthorized: Email not found.");
            }

            String finalEmail = email;
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + finalEmail));


            ObjectMapper objectMapper = new ObjectMapper();
            String newJson = objectMapper.writeValueAsString(resumeDTO);

            Optional<Resume> existingResumeOpt = resumeRepository.findByUserId(user.getId());

            if (existingResumeOpt.isPresent()) {
                Resume existing = existingResumeOpt.get();
                if (existing.getContentJson().equals(newJson)) {
                    return "Resume already saved (no changes)";
                } else {
                    existing.setContentJson(newJson);
                    existing.setTemplateType(resumeDTO.getTemplateType());
                    existing.setCreatedAt(LocalDateTime.now());
                    resumeRepository.save(existing);
                    return "Resume updated successfully";
                }
            }

            Resume newResume = new Resume();
            newResume.setUser(user);
            newResume.setCreatedAt(LocalDateTime.now());
            newResume.setTemplateType(resumeDTO.getTemplateType());
            newResume.setContentJson(newJson);
            resumeRepository.save(newResume);

            return "Resume saved successfully";
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to save or update resume: " + e.getMessage());
        }
    }
}




