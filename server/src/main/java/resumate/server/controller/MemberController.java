package resumate.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import resumate.server.dto.Member;
import resumate.server.service.MemberService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {
    private final MemberService memberService;

    /**
     * POST /api/login -> 로그인
     * 입력: {"email": "1@test.com", "password": "1111"}
     * 출력: JWT 토큰 -> 쿠키에 저장
     */
    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> postLogin(@RequestBody Member member, HttpServletResponse response) {
        return memberService.loginHandler(member, response);
    }

    /*
     * POST /api/member -> 회원가입
     * 입력: {"email": "1@test.com", "password": "1111"}
     * 출력: 회원가입 성공 메시지
     */
    @PostMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> postMember(@RequestBody Member member) {
        return memberService.insertMember(member);
    }

    /*
     * PATCH /api/member -> 비밀번호 수정
     * 입력: {"password": "1111", "password2": "2222"}
     * 출력: 비밀번호 수정 성공 메시지
     */
    @PatchMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> patchMember(@RequestHeader("authorization") String bearer,
            @RequestBody Member member) {
        return memberService.updateMember(bearer, member);
    }

    /*
     * DELETE /api/member -> 회원탈퇴
     * 입력: {"password": "2222"}
     * 출력: 회원탈퇴 성공 메시지
     */
    @DeleteMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> deleteMember(@RequestHeader("authorization") String bearer,
            @RequestBody Member member) {
        return memberService.deleteMember(bearer, member);
    }
}
