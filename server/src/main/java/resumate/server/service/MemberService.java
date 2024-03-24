package resumate.server.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import resumate.server.dto.Member;
import resumate.server.mybatis.MemberMapper;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final BCryptPasswordEncoder passwordEncoder;
    private final MemberMapper memberMapper;

    // true = 통과, 문제가 없는 상황
    // false = 실패, 문제가 있는 상황

    // 이메일, 비밀번호 null 체크
    public boolean checkNull(String email, String password) {
        return email != null && password != null;
    }

    // 이메일 중복 확인
    public boolean checkMemberMail(String email) {
        return memberMapper.selectMemberCount(email) == 0;
    }

    // 이메일, 비밀번호 검증
    public boolean checkMemberPass(String email, String password) {
        if (!checkNull(email, password)) {
            return false;
        }
        String encodedPass = memberMapper.selectMemberPass(email);
        return passwordEncoder.matches(password, encodedPass);
    }

    // 회원가입
    public boolean insertMember(String email, String password) {
        if (!checkNull(email, password) || !checkMemberMail(email)) {
            return false;
        } else {
            Member member = new Member();
            member.setEmail(email);
            member.setPassword(passwordEncoder.encode(password));
            memberMapper.insertMember(member);
            return true;
        }
    }

    // 비밀번호 변경
    public boolean updateMember(String email, String password, String password2) {
        if (!checkNull(email, password) || password2 == null || !checkMemberPass(email, password)) {
            return false;
        } else {
            Member member = new Member();
            member.setEmail(email);
            member.setPassword(passwordEncoder.encode(password2));
            memberMapper.updateMember(member);
            return true;
        }
    }

    // 회원 탈퇴
    public boolean deleteMember(String email, String password) {
        if (!checkNull(email, password) || !checkMemberPass(email, password)) {
            return false;
        } else {
            memberMapper.deleteMember(email);
            return true;
        }
    }
}
