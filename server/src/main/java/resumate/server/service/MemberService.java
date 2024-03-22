package resumate.server.service;

import java.util.Date;

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

    public boolean checkNull(String email, String password) {
        return email != null && password != null;
    }

    public boolean checkMemberMail(String email) {
        return memberMapper.selectMemberEmail(email) > 0 ? true : false;
    }

    public boolean checkMemberPass(String email, String password) {
        Member member = new Member();
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));
        return memberMapper.selectMemberPass(member) > 0 ? true : false;
    }

    public boolean insertMember(String email, String password) {
        if (!checkNull(email, password)) {
            return false;
        } else {
            Member member = new Member();
            member.setEmail(email);
            member.setPassword(passwordEncoder.encode(password));
            memberMapper.insertMember(member);
            return true;
        }
    }

    public String updateMember(String email, String password, String password2) {
        if (!checkNull(email, password)) {
            throw new IllegalArgumentException("Email and password are required.");
        }
        Member member = new Member();
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));
        if (memberMapper.selectMemberPass(member) == null) {
            return null;
        }
        member.setPassword(passwordEncoder.encode(password2));
        memberMapper.updateMember(member);
        return "Member updated: " + email;
    }

    public void deleteMember(String email, String password) {

        Member member = new Member();
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));
        if (memberMapper.selectMemberPass(member) == null) {
            throw new IllegalArgumentException("Authentication failed");
        }
        memberMapper.deleteMember(member);
    }
}
