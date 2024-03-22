package resumate.server.mybatis;

import org.apache.ibatis.annotations.Mapper;

import resumate.server.dto.Member;

@Mapper
public interface MemberMapper {
    int selectMemberEmail(String email);
    int selectMemberPass(Member member);
    void insertMember(Member member);
    void updateMember(Member member);
    void deleteMember(Member member);
}
