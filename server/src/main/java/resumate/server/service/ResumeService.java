package resumate.server.service;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import resumate.server.config.JsonBuilder;
import resumate.server.config.JwtConfig;
import resumate.server.dto.Resume;
import resumate.server.mybatis.ResumeMapper;

@Service
@RequiredArgsConstructor
public class ResumeService {
    private final ResumeMapper resumeMapper;
    private final JsonBuilder jsonBuilder;
    private final JwtConfig jwtConfig;

    /*
     * 입력: Authorization 요청 헤더 - Bearer 토큰
     * 출력: 로그인된 이메일 주소
     */
    public String getEmailFromBearer(String bearer) {
        String token = bearer.substring(7);
        return jwtConfig.getEmailFromToken(token);
    }

    /*
     * 입력: JSON 문자열
     * 출력: JSON 문자열의 title 값
     */
    public String getTitleFromJson(String json) {
        final JsonObject jsonObject = JsonParser.parseString(json).getAsJsonObject();
        return jsonObject.get("title").getAsString();
    }

    /*
     * 입력: Bearer 토큰
     * 출력: 로그인 여부
     */
    public boolean isLoggedin(String bearer) {
        String email = getEmailFromBearer(bearer);
        return email != null && !email.isEmpty();
    }

    /*
     * 입력: 이메일, 이력서 ID
     * 출력: 이력서 소유 여부
     */
    public boolean isResumeOwner(String email, int id) {
        List<Integer> resumeIdList = resumeMapper.selectResumeId(email);
        for (int resumeId : resumeIdList) {
            if (resumeId == id) {
                return true;
            }
        }
        return false;
    }

    /*
     * 이력서 목록 조회
     * 입력: Bearer 토큰
     * 출력: 성공 -> 이력서 목록 / 실패 -> 로그인 필요 메시지
     */
    public ResponseEntity<String> selectResumeHead(String bearer) {
        if (bearer == null || bearer.isEmpty()) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build(); 
                    //복잡한 객체의 생성과정과 표현방법을 분리하여 다양한 구성의 인스턴스를 만드는 생성 패턴.
                    //예를 들어서 햄버거나 샌드위치를 주문할 때 취향대로 선택적인 속재료를 유연하게 받는다.
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String email = getEmailFromBearer(bearer);
            if (!isLoggedin(bearer)) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "로그인이 필요합니다.")
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
            } else {
                List<Resume> resumeList = resumeMapper.selectResumeHead(email);
                Gson gson = new Gson();
                String responseJson = gson.toJson(resumeList);
                return ResponseEntity.ok().body(responseJson);
            }
        }
    }

    /*
     * 이력서 내용 조회
     * 입력: Bearer 토큰, 이력서 ID
     * 출력: 성공 -> 이력서 내용 / 실패 -> 권한 없음 메시지
     */
    public ResponseEntity<String> selectResumeBody(String bearer, int id) {
        if (bearer == null || bearer.isEmpty()) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String email = getEmailFromBearer(bearer);
            if (!isResumeOwner(email, id)) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "권한이 없습니다.")
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
            } else {
                String resume = resumeMapper.selectResumeBody(id);
                return ResponseEntity.ok().body(resume);
            }
        }
    }

    /*
     * 이력서 수정
     * 입력: Bearer 토큰, 수정 이력서 내용, 이력서 ID
     * 출력: 성공 -> 이력서 수정 성공 메시지 / 실패 -> 권한 없음 메시지
     */
    public ResponseEntity<String> updateResume(String bearer, String resume, int id) {
        if (bearer == null || bearer.isEmpty()) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String email = getEmailFromBearer(bearer);

            if (!isResumeOwner(email, id)) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "권한이 없습니다.")
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
            } else if (resume == null || getTitleFromJson(resume).length() == 0) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "제목을 입력해주세요.")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseJson);
            } else {
                Resume newResume = new Resume();
                newResume.setEmail(email);
                newResume.setTitle(getTitleFromJson(resume));
                newResume.setContent(resume);
                newResume.setId(id);
                resumeMapper.updateResume(newResume);
                String responseJson = jsonBuilder
                        .put("status", "success")
                        .put("message", "이력서가 수정되었습니다.")
                        .build();
                return ResponseEntity.ok().body(responseJson);
            }
        }
    }

    /*
     * 이력서 등록
     * 입력: Bearer 토큰, 이력서 내용
     * 출력: 성공 -> 이력서 등록 성공 메시지 / 실패 -> 권한 없음 메시지
     */
    public ResponseEntity<String> insertResume(String bearer, String resume) {
        if (bearer == null || bearer.isEmpty()) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String email = getEmailFromBearer(bearer);

            if (!isLoggedin(bearer)) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "권한이 없습니다.")
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
            } else if (resume == null || getTitleFromJson(resume).length() == 0) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "제목을 입력해주세요.")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseJson);
            } else {
                Resume newResume = new Resume();
                newResume.setEmail(email);
                newResume.setTitle(getTitleFromJson(resume));
                newResume.setContent(resume);
                resumeMapper.insertResume(newResume);
                String responseJson = jsonBuilder
                        .put("status", "success")
                        .put("message", "이력서가 추가되었습니다.")
                        .build();
                return ResponseEntity.ok().body(responseJson);
            }
        }
    }

    /*
     * 이력서 삭제
     * 입력: Bearer 토큰, 이력서 ID
     * 출력: 성공 -> 이력서 삭제 성공 메시지 / 실패 -> 권한 없음 메시지
     */
    public ResponseEntity<String> deleteResume(String bearer, int id) {
        if (bearer == null || bearer.isEmpty()) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String email = getEmailFromBearer(bearer);

            if (!isResumeOwner(email, id)) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "권한이 없습니다.")
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
            } else {
                resumeMapper.deleteResume(id);
                String responseJson = jsonBuilder
                        .put("status", "success")
                        .put("message", id + "번 이력서가 삭제되었습니다.")
                        .build();
                return ResponseEntity.ok().body(responseJson);
            }
        }
    }
}