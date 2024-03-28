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

    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> postLogin(@RequestBody Member member, HttpServletResponse response) {
        return memberService.loginHandler(member, response);
    }

    @PostMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> postMember(@RequestBody Member member) {
        return memberService.insertMember(member);
    }

    @PatchMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> patchMember(@RequestHeader("authorization") String bearer,
            @RequestBody Member member) {
        return memberService.updateMember(bearer, member);
    }

    @DeleteMapping(value = "/member", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> deleteMember(@RequestHeader("authorization") String bearer,
            @RequestBody Member member) {
        return memberService.deleteMember(bearer, member);
    }
}
