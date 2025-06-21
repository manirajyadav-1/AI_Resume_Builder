package com.resume.backend.Resume.Builder.service;

import com.resume.backend.Resume.Builder.model.Resume;
import com.resume.backend.Resume.Builder.model.User;
import com.resume.backend.Resume.Builder.respository.ResumeRepository;
import com.resume.backend.Resume.Builder.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class ResumeStorageService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    public String save(Resume resume, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

        resume.setUser(user);

        return resumeRepository.findByUserId(user.getId())
                .map(existing -> {
                    if (existing.getContentJson().equals(resume.getContentJson())) {
                        return "Resume already saved (no changes)";
                    } else {
                        existing.setContentJson(resume.getContentJson());
                        existing.setTemplateType(resume.getTemplateType());
                        existing.setCreatedAt(LocalDateTime.now());
                        resumeRepository.save(existing);
                        return "Resume updated successfully";
                    }
                })
                .orElseGet(() -> {
                    resume.setCreatedAt(LocalDateTime.now());
                    resumeRepository.save(resume);
                    return "Resume saved successfully";
                });
    }
}

