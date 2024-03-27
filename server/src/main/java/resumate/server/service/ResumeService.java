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

    public String getTitleFromJson(String json) {
        final JsonObject jsonObject = JsonParser.parseString(json).getAsJsonObject();
        return jsonObject.get("title").getAsString();
    }

    // 요청 헤더의 Bearer 확인하여 로그인 여부 확인
    public boolean isLoggedin(String bearer) {
        String token = bearer.substring(7);
        String email = jwtConfig.getEmailFromToken(token);
        return email != null;
    }

    // 이메일에 따른 이력서 ID 접근 권한 조회
    public boolean isResumeOwner(String email, int id) {
        List<Integer> resumeIdList = resumeMapper.selectResumeId(email);
        for (int resumeId : resumeIdList) {
            if (resumeId == id) {
                return true;
            }
        }
        return false;
    }

    // 컨트롤러: 이력서 목록 조회
    public ResponseEntity<String> selectResumeHead(String bearer) {
        String token = bearer.substring(7);
        String email = jwtConfig.getEmailFromToken(token);
        if (email == null) {
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

    // 컨트롤러: 이력서 내용 조회
    public ResponseEntity<String> selectResumeBody(String bearer, int id) {
        String token = bearer.substring(7);
        String email = jwtConfig.getEmailFromToken(token);
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

    // 컨트롤러: 이력서 수정
    public ResponseEntity<String> updateResume(String bearer, String resume, int id) {
        String token = bearer.substring(7);
        String email = jwtConfig.getEmailFromToken(token);

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

    // 컨트롤러: 이력서 추가
    public ResponseEntity<String> insertResume(String bearer, String resume) {
        String token = bearer.substring(7);
        String email = jwtConfig.getEmailFromToken(token);

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

    // 컨트롤러: 이력서 삭제
    public ResponseEntity<String> deleteResume(String bearer, int id) {
        String token = bearer.substring(7);
        String email = jwtConfig.getEmailFromToken(token);

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