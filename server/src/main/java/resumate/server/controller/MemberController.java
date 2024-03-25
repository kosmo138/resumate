package resumate.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import resumate.server.config.JsonBuilder;
import resumate.server.config.JwtConfig;
import resumate.server.dto.Member;
import resumate.server.service.MemberService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {
    /**
     * RequiredArgsConstructor
     * - 초기화되지 않은 final 필드에 대한 생성자를 Lombok이 생성하여 의존성 주입
     * - Autowired를 이용한 필드 의존성 주입보다 생성자 주입이 권장됨
     * 
     * @see https://ahndding.tistory.com/9
     */
    private final MemberService memberService;
    private final JsonBuilder jsonBuilder;
    private final JwtConfig jwtConfig;

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> loginHandler(@RequestBody Member member, HttpServletResponse response) {
        String email = member.getEmail();
        String password = member.getPassword();

        if (memberService.checkMemberPass(email, password)) {
            String access_token = jwtConfig.issueAccessToken(email);

            Cookie cookie = new Cookie("authorization", access_token);
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            response.addCookie(cookie);

            String responseJson = jsonBuilder
                    .put("status", "success")
                    .put("message", "로그인에 성공했습니다.")
                    .put("email", email)
                    .build();
            return ResponseEntity.ok().body(responseJson);
        } else {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "이메일과 비밀번호를 확인해주세요.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        }
    }

    @PostMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> insertMember(@RequestBody Member member) {
        String email = member.getEmail();
        String password = member.getPassword();

        if (memberService.insertMember(email, password)) {
            String responseJson = jsonBuilder
                    .put("status", "success")
                    .put("message", "계정이 생성되었습니다.")
                    .build();
            return ResponseEntity.ok().body(responseJson);
        } else {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "이메일과 비밀번호를 확인해주세요.")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseJson);
        }
    }

    @PatchMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> updateMember(@RequestHeader("authorization") String bearer,
            @RequestBody Member member) {
        String token = bearer.substring(7);
        String email = jwtConfig.getEmailFromToken(token);
        if (email == null) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String password = member.getPassword();
            String password2 = member.getPassword2();

            if (memberService.updateMember(email, password, password2)) {
                String responseJson = jsonBuilder
                        .put("status", "success")
                        .put("message", "비밀번호가 변경되었습니다.")
                        .build();
                return ResponseEntity.ok().body(responseJson);
            } else {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "비밀번호를 확인해 주세요.")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseJson);
            }
        }
    }

    @DeleteMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> deleteMember(@RequestHeader("authorization") String bearer,
            @RequestBody Member member) {
        String token = bearer.substring(7);
        String email = jwtConfig.getEmailFromToken(token);

        if (email == null) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String password = member.getPassword();
            if (memberService.deleteMember(email, password)) {
                String responseJson = jsonBuilder
                        .put("status", "success")
                        .put("message", "계정이 삭제되었습니다.")
                        .put("email", email)
                        .build();
                return ResponseEntity.ok().body(responseJson);
            } else {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "이메일과 비밀번호를 확인해주세요.")
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
            }
        }
    }
}
