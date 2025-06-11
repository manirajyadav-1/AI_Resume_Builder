package com.resume.backend.Resume.Builder.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.backend.Resume.Builder.Dto.LoginDto;
import com.resume.backend.Resume.Builder.ResumeRequest;
import com.resume.backend.Resume.Builder.loginresponse.LoginResponse;
import com.resume.backend.Resume.Builder.model.User;
import com.resume.backend.Resume.Builder.respository.UserRepository;
import com.resume.backend.Resume.Builder.service.JWTService;
import com.resume.backend.Resume.Builder.service.ResumeService;
import com.resume.backend.Resume.Builder.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.signup(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginDto loginDto) {
        User user = userService.loginUser(loginDto);
        String jwtToken = jwtService.generateToken(new HashMap<>(), (UserDetails) user);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setTokenExpireTime(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/success")
    public ResponseEntity<Map<String, Object>> loginSuccess(
            @AuthenticationPrincipal(expression = "name") String username,
            @AuthenticationPrincipal OAuth2User oAuth2User,
            Authentication authentication) {

        Map<String, Object> response = new HashMap<>();

        if (authentication != null) {
            response.put("authorities", authentication.getAuthorities());

            if (authentication.getPrincipal() instanceof OAuth2User) {
                response.put("email", oAuth2User.getAttribute("email"));
                response.put("name", oAuth2User.getAttribute("name"));
                response.put("type", "oauth2");
            } else if (authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.User) {
                response.put("username", username);
                response.put("type", "jwt");
            }
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate();
        response.setHeader("Set-Cookie", "JSESSIONID=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure");
        return ResponseEntity.ok("Logged out successfully");
    }
}