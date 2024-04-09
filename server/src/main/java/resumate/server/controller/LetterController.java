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
import resumate.server.dto.Letter;
import resumate.server.service.LetterService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/letter")
public class LetterController {
    private final LetterService letterService;

    /**
     * GET /api/letter -> 자소서 목록 조회
     * 입력: 헤더 JWT
     * 출력: [{"id": 1, "title": "제목", "modified": 1700000000}, ...]
     */
    @GetMapping(value = { "", "/" }, produces = "application/json")
    public ResponseEntity<String> getLetter(@RequestHeader("authorization") String bearer) {
        return letterService.selectLetterHead(bearer);
    }

    /*
     * GET /api/letter/1 -> 자소서 내용 조회
     * 입력: 헤더 JWT, 자소서 ID
     * 출력: {"title": "제목", "company": "회사명", "content": ...}
     */
    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<String> getLetterById(@RequestHeader("authorization") String bearer,
            @PathVariable("id") int id) {
        return letterService.selectLetterBody(bearer, id);
    }

    /*
     * POST /api/letter -> 자소서 등록
     * 입력: 헤더 JWT, {"title": "제목", "company": "회사명", "content": ...}
     * 출력: 자소서 등록 성공 메시지
     */
    @PostMapping(value = { "", "/" }, consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> postLetter(@RequestHeader("authorization") String bearer,
            @RequestBody Letter letter) {
        return letterService.insertLetter(bearer, letter);
    }

    /*
     * PUT /api/letter/1 -> 자소서 복사
     * 입력: 헤더 JWT, 자소서 ID
     * 출력: 자소서 복사 성공 메시지
     */
    @PutMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<String> putLetterById(@RequestHeader("authorization") String bearer,
            @PathVariable("id") int id) {
        return letterService.cloneLetter(bearer, id);
    }

    /*
     * PATCH /api/letter/1 -> 자소서 수정
     * 입력: 헤더 JWT, {"title": "제목", "company": "회사명", "content": ...}
     * 출력: 자소서 수정 성공 메시지
     */
    @PatchMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> patchLetterById(@RequestHeader("authorization") String bearer,
            @RequestBody Letter letter, @PathVariable("id") int id) {
        return letterService.updateLetter(bearer, letter, id);
    }

    /*
     * DELETE /api/letter/1 -> 자소서 삭제
     * 입력: 헤더 JWT, 자소서 ID
     * 출력: 자소서 삭제 성공 메시지
     */
    @DeleteMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<String> deleteLetterById(@RequestHeader("authorization") String bearer,
            @PathVariable("id") int id) {
        return letterService.deleteLetter(bearer, id);
    }
}
