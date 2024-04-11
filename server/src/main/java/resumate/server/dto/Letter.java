package resumate.server.dto;

<<<<<<< HEAD
=======
import java.util.List;

>>>>>>> origin/dev
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class Letter {
    private int id;
    private String email;
<<<<<<< HEAD
    private String resume_id;
    private String title;
    private String company;
    private String job;
    private String content;
=======
    private int resume_id;
    private String title;
    private String company;
    private String job;
    private List<LetterContent> content;
>>>>>>> origin/dev
    private int modified;
}
