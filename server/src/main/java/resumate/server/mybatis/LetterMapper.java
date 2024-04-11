package resumate.server.mybatis;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import resumate.server.dto.Letter;

@Mapper
public interface LetterMapper {
    List<Letter> selectLetterHead(String email);
<<<<<<< HEAD
    String selectLetterBody(int id);
=======
    Letter selectLetterBody(int id);
>>>>>>> origin/dev
    List<Integer> selectLetterId(String email);
    void insertLetter(Letter letter);
    void updateLetter(Letter letter);
    void deleteLetter(int id);
}
