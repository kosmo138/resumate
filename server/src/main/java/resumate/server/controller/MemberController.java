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

import lombok.RequiredArgsConstructor;
import resumate.server.service.MemberService;
import resumate.server.config.JsonBuilder;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {
    /**
     * RequiredArgsConstructor
     * 초기화되지 않은 final 필드에 대한 생성자를 Lombok이 생성하여 의존성 주입
     * Autowired를 이용한 필드 의존성 주입보다 생성자 주입이 권장됨
     * 
     * @see https://ahndding.tistory.com/9
     */
    private final MemberService memberService;
    private final JsonBuilder jsonBuilder;

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> loginHandler(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (memberService.checkAuth(email, password)) {
            String responseJson = jsonBuilder.put("status", "success").put("email", email).build();
            return ResponseEntity.ok().body(responseJson);
        } else {
            String responseJson = jsonBuilder.put("status", "fail").build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        }
    }

    @PostMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> insertMember(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (!memberService.checkNull(email, password)) {
            String responseJson = jsonBuilder.put("status", "fail").put("message", "Email and password are required.")
                    .build();
            return ResponseEntity.badRequest().body(responseJson);
        } else if (memberService.checkMemberPass(email, password) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("{\"message\": \"Member already exists: " + email + "\"}");
        } else {
            memberService.insertMember(email, password);
            return ResponseEntity.ok().body("{\"message\": \"Member created: " + email + "\"}");
        }
    }

    @PatchMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> updateMember(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String password2 = request.get("password2");

        if (checkAuth(email, password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Authentication failed\"}");
        }
        String message = memberService.updateMember(email, password, password2);
        if (message == null) {
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
