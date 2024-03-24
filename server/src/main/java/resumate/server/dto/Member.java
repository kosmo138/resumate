package resumate.server.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class Member {
    private String email;
    private String password;
    private String password2;
}
