package resumate.server.mybatis;

import org.apache.ibatis.annotations.Mapper;

import resumate.server.dto.Member;

import java.util.Date;

@Mapper
public interface MemberMapper {
    Date getCreatedAt(Member member);
    void insertMember(Member member);
    void updateMember(Member member);
    void deleteMember(Member member);
}
