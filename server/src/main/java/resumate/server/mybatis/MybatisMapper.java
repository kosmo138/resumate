package resumate.server.mybatis;

import org.apache.ibatis.annotations.Mapper;

import java.util.Date;

@Mapper
public interface MybatisMapper {
    Date getCreatedAt(String email, String password);
}
