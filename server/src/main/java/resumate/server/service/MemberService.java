package resumate.server.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import resumate.server.config.JsonBuilder;
import resumate.server.config.JwtConfig;
import resumate.server.dto.Member;
import resumate.server.mybatis.MemberMapper;

/**
 * RequiredArgsConstructor
 * - 초기화되지 않은 final 필드에 대한 생성자를 Lombok이 생성하여 의존성 주입
 * - Autowired를 이용한 필드 의존성 주입보다 생성자 주입이 권장됨
 * 
 * @see https://ahndding.tistory.com/9
 */

@Service
@RequiredArgsConstructor
public class MemberService {
    private final BCryptPasswordEncoder passwordEncoder;
    private final MemberMapper memberMapper;
    private final JsonBuilder jsonBuilder;
    private final JwtConfig jwtConfig;

    /*
     * 반환값의 의미
     * true = 통과, 문제가 없는 상황
     * false = 실패, 문제가 있는 상황
     */

    /*
     * 입력 유효성 검사
     * 입력: 이메일, 비밀번호
     * 출력: 이메일, 비밀번호가 null이 아니고 비어있지 않은지 확인
     */
    public boolean checkNull(String email, String password) {
        return email != null && password != null && !email.isEmpty() && !password.isEmpty();
    }

    /*
     * 이메일 중복 확인
     * 입력: 이메일
     * 출력: 이메일이 중복되지 않았는지 확인
     */
    public boolean checkMemberMail(String email) {
        return memberMapper.selectMemberCount(email) == 0;
    }

    /*
     * 이메일, 비밀번호 검증
     * 입력: 이메일, 비밀번호
     * 출력: 이메일과 비밀번호 일치 여부
     */
    public boolean checkMemberPass(String email, String password) {
        if (!checkNull(email, password)) {
            return false;
        }
        String encodedPass = memberMapper.selectMemberPass(email);
        return passwordEncoder.matches(password, encodedPass);
    }

    /*
     * JWT 토큰을 쿠키에 저장
     * 입력: 이메일
     * 출력: 쿠키에 JWT 토큰 저장
     */
    void tokenInCookie(String email, HttpServletResponse response) {
        String access_token = jwtConfig.issueAccessToken(email);

        Cookie cookie = new Cookie("authorization", access_token);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    /*
     * 입력: Authorization 요청 헤더 - Bearer 토큰
     * 출력: 로그인된 이메일 주소
     */
    public String getEmailFromBearer(String bearer) {
        String token = bearer.substring(7);
        return jwtConfig.getEmailFromToken(token);
    }

    /*
     * 입력: Bearer 토큰
     * 출력: 로그인 여부
     */
    public boolean isLoggedin(String bearer) {
        String email = getEmailFromBearer(bearer);
        return email != null && !email.isEmpty();
    }

    /*
     * 로그인
     * 입력: 이메일, 비밀번호
     * 출력: 성공 -> 성공 메시지 + JWT를 쿠키에 저장 / 실패 -> 실패 메시지
     */
    public ResponseEntity<String> loginHandler(Member member, HttpServletResponse response) {
        String email = member.getEmail();
        String password = member.getPassword();

        if (checkMemberPass(email, password)) {
            tokenInCookie(email, response);

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

    /*
     * 회원가입
     * 입력: 이메일, 비밀번호
     * 출력: 성공 -> 성공 메시지 / 실패 -> 실패 메시지
     */
    public ResponseEntity<String> insertMember(Member member) {
        String email = member.getEmail();
        String password = member.getPassword();

        if (checkNull(email, password) && checkMemberMail(email)) {
            Member newMember = new Member();
            newMember.setEmail(email);
            newMember.setPassword(passwordEncoder.encode(password));
            memberMapper.insertMember(newMember);

            String responseJson = jsonBuilder
                    .put("status", "success")
                    .put("message", "계정이 생성되었습니다. 로그인을 진행해 주세요.")
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

    /*
     * 비밀번호 변경
     * 입력: JWT, 기존 비밀번호, 신규 비밀번호
     * 출력: 성공 -> 성공 메시지 / 실패 -> 실패 메시지
     */
    public ResponseEntity<String> updateMember(String bearer, Member member) {
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

            if (checkNull(email, password) && password2 != null && checkMemberPass(email, password)) {
                Member changedMember = new Member();
                changedMember.setEmail(email);
                changedMember.setPassword(passwordEncoder.encode(password2));
                memberMapper.updateMember(changedMember);
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

    /*
     * 회원탈퇴
     * 입력: JWT, 비밀번호
     * 출력: 성공 -> 성공 메시지 / 실패 -> 실패 메시지
     */
    public ResponseEntity<String> deleteMember(String bearer, Member member) {
        String token = bearer.substring(7);
        String email = jwtConfig.getEmailFromToken(token);
        String password = member.getPassword();

        if (email == null) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else if (checkNull(email, password) && checkMemberPass(email, password)) {
            memberMapper.deleteMember(email);
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