package resumate.server.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class Resume {
    private int id;
    private String email;
    private String title;
    private String content;
    private int modified;
}
