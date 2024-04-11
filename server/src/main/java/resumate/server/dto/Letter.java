package resumate.server.dto;

import java.util.List;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class Letter {
    private int id;
    private String email;
    private int resume_id;
    private String title;
    private String company;
    private String job;
    private List<LetterContent> content;
    private int modified;
}
