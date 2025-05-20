package com.resume.backend.Resume.Builder;

import com.resume.backend.Resume.Builder.service.ResumeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
class ResumeBuilderApplicationTests {

	@Autowired
	private ResumeService resumeService;

	@Test
	void contextLoads() throws IOException {
		resumeService.generateResumeResponse("I am Maniraj Yadav with 2 years of experience in Java and React.");
	}

}
