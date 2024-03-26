package resumate.server.service;

import java.util.List;

import com.google.gson.Gson;
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

    // 이메일에 따른 이력서 ID 접근 권한 조회
    public boolean isResumeOwner(String email, int id) {
        int[] resumeIdList = resumeMapper.selectResumeId(email);
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
        int[] resumeIdList = resumeMapper.selectResumeId(email);
        if (!isResumeOwner(email, id)) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "권한이 없습니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            Resume resume = resumeMapper.selectResumeBody(id);
            Gson gson = new Gson();
            String responseJson = gson.toJson(resume);
            return ResponseEntity.ok().body(responseJson);
        }
    }

    // 컨트롤러: 이력서 수정
    public ResponseEntity<String> updateResume(String bearer, Resume resume, int id) {
        String token = bearer.substring(7);
        String email = jwtConfig.getEmailFromToken(token);

        if (!isResumeOwner(email, id)) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "권한이 없습니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            resumeMapper.updateResume(resume);
            String responseJson = jsonBuilder
                    .put("status", "success")
                    .put("message", "이력서가 수정되었습니다.")
                    .build();
            return ResponseEntity.ok().body(responseJson);
        }
    }

    // 컨트롤러: 이력서 추가
    public ResponseEntity<String> insertResume(String bearer, Resume resume) {
        String token = bearer.substring(7);
        String email = jwtConfig.getEmailFromToken(token);

        if (!isResumeOwner(email, id)) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "권한이 없습니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            resume.setEmail(email);
            resumeMapper.insertResume(resume);
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