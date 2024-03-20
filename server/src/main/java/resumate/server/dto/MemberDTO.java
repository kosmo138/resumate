package resumate.server.dto;

import lombok.Data;

// @Data 애노테이션 사용은 지양해야 한다. 테스트 이후 수정 예정.
@Data
public class MemberDTO {
    private int id;
    private String email;
    private String password;
    private String created_at;
}
