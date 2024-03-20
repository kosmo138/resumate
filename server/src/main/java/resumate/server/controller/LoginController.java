package resumate.server.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import resumate.server.service.MemberService;

@RestController
@RequestMapping("/api")
public class LoginController {
    private final MemberService memberService;

    public LoginController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/login")
    public String getTest() {
        return "<h2>GET response from /login</h2>";
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> checkCreatedAt(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        // Validate the email and password
        if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body("{\"message\": \"Email and password are required.\"}");
        }

        // Authenticate the user
        String createdAt = memberService.getCreatedAt(email, password);

        // Check if the authentication was successful
        if (createdAt != null) {
            // Authentication successful, return createdAt timestamp
            return ResponseEntity.ok().body("{\"createdAt\": \"" + createdAt + "\"}");
        } else {
            // Authentication failed, return 401 Unauthorized
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Authentication failed\"}");
        }
    }
}
