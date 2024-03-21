package resumate.server.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import resumate.server.dto.Member;
import resumate.server.mybatis.MemberMapper;

@Service
public class MemberService {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    /* 인터페이스는 생성자가 없으므로 Autowired를 통한 의존성 주입을 하지 않는다. */
    private final MemberMapper memberMapper;

    public MemberService(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    public String getCreatedAt(String email, String password) {
        Member member = new Member();
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));
        final Date createdAt = memberMapper.getCreatedAt(member);
        if (createdAt == null) {
            return null;
        } else {
            return createdAt.toString();
        }
    }

    public void insertMember(String email, String password) {
        Member member = new Member();
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));
        memberMapper.insertMember(member);
    }

    public String updateMember(String email, String password, String password2) {
        Member member = new Member();
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));
        if (memberMapper.getCreatedAt(member) == null) {
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
        if (memberMapper.getCreatedAt(member) == null) {
            throw new IllegalArgumentException("Authentication failed");
        }
        memberMapper.deleteMember(member);
    }
}
