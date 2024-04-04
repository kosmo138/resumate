package resumate.server.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import resumate.server.dto.Letter;

@Mapper
public interface LetterMapper {
    List<Letter> selectLetterHead(String email);
    String selectLetterBody(int id);
    List<Integer> selectLetterId(String email);
    void insertLetter(Letter letter);
    void updateLetter(Letter letter);
    void deleteLetter(int id);
}
