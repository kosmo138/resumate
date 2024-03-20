package resumate.server.mybatis;

import org.apache.ibatis.annotations.Mapper;

import resumate.server.dto.MemberDTO;

import java.util.Date;

@Mapper
public interface MybatisMapper {
    Date getCreatedAt(MemberDTO memberDTO);
}
