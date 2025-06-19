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

    public void save(Resume resume, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

        resume.setUser(user);
        resumeRepository.save(resume);
    }
}
