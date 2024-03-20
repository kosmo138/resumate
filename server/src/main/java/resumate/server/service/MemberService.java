package resumate.server.service;

import org.springframework.stereotype.Service;

import resumate.server.dto.MemberDTO;
import resumate.server.mybatis.MybatisMapper;

@Service
public class MemberService {
    private final MybatisMapper mybatisMapper;

    public MemberService(MybatisMapper mybatisMapper) {
        this.mybatisMapper = mybatisMapper;
    }

    public String getCreatedAt(String email, String password) {
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setEmail(email);
        memberDTO.setPassword(password);
        return mybatisMapper.getCreatedAt(memberDTO).toString();
    }
}
