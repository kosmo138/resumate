package resumate.server.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import resumate.server.dto.Resume;

@Mapper
public interface ResumeMapper {
    List<Resume> selectResumeHead(String email);
    String selectResumeBody(int id);
    List<Integer> selectResumeId(String email);
    void insertResume(Resume resume);
    void updateResume(Resume resume);
    void deleteResume(int id);
}
