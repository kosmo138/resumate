package resumate.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import resumate.server.service.ResumeService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/resume")
public class ResumeController {
    private final ResumeService resumeService;

    /**
     * GET /api/resume -> 이력서 목록 조회
     * 입력: 헤더 JWT
     * 출력: [{"id": 1, "title": "제목", "modified": 1700000000}, ...]
     */
    @GetMapping(value = { "", "/" }, produces = "application/json")
    public ResponseEntity<String> getResume(@RequestHeader("authorization") String bearer) {
        return resumeService.selectResumeHead(bearer);
    }

    /*
     * GET /api/resume/1 -> 이력서 내용 조회
     * 입력: 헤더 JWT, 이력서 ID
     * 출력: {"title": "제목", "career": "경력", "education": ...}
     */
    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<String> getResumeById(@RequestHeader("authorization") String bearer,
            @PathVariable("id") int id) {
        return resumeService.selectResumeBody(bearer, id);
    }

    /*
     * POST /api/resume -> 이력서 등록
     * 입력: 헤더 JWT, {"title": "제목", "career": "경력", "education": ...}
     * 출력: 이력서 등록 성공 메시지
     */
    @PostMapping(value = { "", "/" }, consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> postResume(@RequestHeader("authorization") String bearer,
            @RequestBody String resume) {
        return resumeService.insertResume(bearer, resume);
    }

    /*
     * PUT /api/resume/1 -> 이력서 복사
     * 입력: 헤더 JWT, 이력서 ID
     * 출력: 이력서 복사 성공 메시지
     */
    @PutMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<String> putResumeById(@RequestHeader("authorization") String bearer,
            @PathVariable("id") int id) {
        return resumeService.cloneResume(bearer, id);
    }

    /*
     * PATCH /api/resume/1 -> 이력서 수정
     * 입력: 헤더 JWT, {"title": "제목", "career": "경력", "education": ...}
     * 출력: 이력서 수정 성공 메시지
     */
    @PatchMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> patchResumeById(@RequestHeader("authorization") String bearer,
            @RequestBody String resume, @PathVariable("id") int id) {
        return resumeService.updateResume(bearer, resume, id);
    }

    /*
     * DELETE /api/resume/1 -> 이력서 삭제
     * 입력: 헤더 JWT, 이력서 ID
     * 출력: 이력서 삭제 성공 메시지
     */
    @DeleteMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<String> deleteResumeById(@RequestHeader("authorization") String bearer,
            @PathVariable("id") int id) {
        return resumeService.deleteResume(bearer, id);
    }
}
