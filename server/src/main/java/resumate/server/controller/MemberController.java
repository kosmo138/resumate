package resumate.server.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import resumate.server.service.MemberService;

@RestController
@RequestMapping("/api")
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> checkCreatedAt(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("{\"message\": \"Email and password are required.\"}");
        }

        String createdAt = memberService.getCreatedAt(email, password);

        if (createdAt != null) {
            return ResponseEntity.ok().body("{\"createdAt\": \"" + createdAt + "\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Authentication failed\"}");
        }
    }

    @PostMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> insertMember(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("{\"message\": \"Email and password are required.\"}");
        }

        memberService.insertMember(email, password);

        return ResponseEntity.ok().body("{\"message\": \"Member created: " + email + "\"}");
    }

    @PatchMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> updateMember(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String password2 = request.get("password2");

        if (email == null || password == null || password2 == null) {
            return ResponseEntity.badRequest().body("{\"message\": \"Password Cannot be empty.\"}");
        }
        String message = memberService.updateMember(email, password, password2);
        if(message == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Authentication failed\"}");
        }
        return ResponseEntity.ok().body("{\"message\": \"" + message + "\"}");
    }

    @DeleteMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> deleteMember(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (password == null) {
            return ResponseEntity.badRequest().body("{\"message\": \"Password is required.\"}");
        }

        memberService.deleteMember(email, password);

        return ResponseEntity.ok().body("{\"message\": \"Member deleted: " + email + "\"}");
    }
}
