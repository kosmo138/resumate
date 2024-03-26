package resumate.server.mybatis;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import resumate.server.dto.Resume;

@Mapper
public interface ResumeMapper {
    List<Resume> selectResumeHead(String email);
    Resume selectResumeBody(int id);
    void insertResume(Resume resume);
    void updateResume(Resume resume);
    void deleteResume(int id);
}
