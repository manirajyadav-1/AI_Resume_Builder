package com.resume.backend.Resume.Builder.respository;

import com.resume.backend.Resume.Builder.model.Resume;
import com.resume.backend.Resume.Builder.model.User;
import org.antlr.v4.runtime.misc.MultiMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    Optional<Resume> findByUserId(Long userId);
}
