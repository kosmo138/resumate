package resumate.server.mybatis;

import org.apache.ibatis.annotations.Mapper;

import resumate.server.dto.Member;

@Mapper
public interface MemberMapper {
    int selectMemberCount(String email);
    String selectMemberPass(String email);
    void insertMember(Member member);
    void updateMember(Member member);
    void deleteMember(String email);
}
