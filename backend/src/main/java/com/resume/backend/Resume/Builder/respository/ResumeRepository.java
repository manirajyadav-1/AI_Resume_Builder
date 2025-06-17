package com.resume.backend.Resume.Builder.respository;

import com.resume.backend.Resume.Builder.model.Resume;
import com.resume.backend.Resume.Builder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUser(User user);
}
