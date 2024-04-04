package resumate.server.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class Letter {
    private int id;
    private String email;
    private String resume_id;
    private String title;
    private String company;
    private String job;
    private String content;
    private int modified;
}
