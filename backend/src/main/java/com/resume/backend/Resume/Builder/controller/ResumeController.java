package com.resume.backend.Resume.Builder.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.backend.Resume.Builder.Dto.LoginDto;
import com.resume.backend.Resume.Builder.Dto.ResumeDTO;
import com.resume.backend.Resume.Builder.ResumeRequest;
import com.resume.backend.Resume.Builder.loginresponse.LoginResponse;
import com.resume.backend.Resume.Builder.model.Resume;
import com.resume.backend.Resume.Builder.model.User;
import com.resume.backend.Resume.Builder.respository.ResumeRepository;
import com.resume.backend.Resume.Builder.respository.UserRepository;
import com.resume.backend.Resume.Builder.service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/resume")
public class ResumeController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ResumeStorageService resumeStorageService;

    private final ResumeService resumeService;

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

    @PostMapping("/auth/signup")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            if (userRepository.existsByEmail(user.getEmail())) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("Email already in use");
            }
            User createdUser = userService.signup(user);
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Signup failed: " + e.getMessage());
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginDto loginDto) {

        User user = userService.loginUser(loginDto);

        String jwtToken = jwtService.generateToken(new HashMap<>(), user);

        LoginResponse loginResponse = new LoginResponse();

        loginResponse.setToken(jwtToken);
        loginResponse.setTokenExpireTime(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);

    }

    @GetMapping("/jwt/success")
    public ResponseEntity<User> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = JWTService.extractUsername(token);

        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<Map<String, Object>> user(@AuthenticationPrincipal OAuth2User principal) {
        if (principal != null) {
            String email = principal.getAttribute("email");
            String name = principal.getAttribute("name");
            String picture = principal.getAttribute("picture");

            Optional<User> existingUser = userRepository.findByEmail(email);

            if (existingUser.isEmpty()) {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setName(name);
                newUser.setPicture(picture);
                userRepository.save(newUser);
            }

            return ResponseEntity.ok(Map.of(
                    "name", name,
                    "email", email,
                    "picture", picture,
                    "provider", "oauth2"
            ));
        } else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "User is not authenticated"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();
        response.setHeader("Set-Cookie", "JSESSIONID=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure");
        return ResponseEntity.ok("Logged out successfully");
    }


    @PostMapping("/save")
    public ResponseEntity<?> saveOrUpdateResume(@RequestBody ResumeDTO resumeDTO, @RequestHeader(value = "Authorization", required = false) String authHeader, @AuthenticationPrincipal OAuth2User principal) {
        try {
            String result = resumeStorageService.saveOrUpdate(resumeDTO, authHeader, principal);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

}