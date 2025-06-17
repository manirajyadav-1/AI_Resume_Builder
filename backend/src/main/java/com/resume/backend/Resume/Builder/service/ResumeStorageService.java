package com.resume.backend.Resume.Builder.service;

import com.resume.backend.Resume.Builder.model.Resume;
import com.resume.backend.Resume.Builder.respository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResumeStorageService {

    @Autowired
    private ResumeRepository resumeRepository;

    public void save(Resume resume){
        resumeRepository.save(resume);
    }
}
