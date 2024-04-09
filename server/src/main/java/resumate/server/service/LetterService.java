package resumate.server.service;

import java.util.List;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import resumate.server.config.JsonBuilder;
import resumate.server.dto.Letter;
import resumate.server.mybatis.LetterMapper;

@Service
@RequiredArgsConstructor
public class LetterService {
    private final LetterMapper letterMapper;
    private final MemberService memberService;
    private final JsonBuilder jsonBuilder;

    /*
     * 입력: 이메일, 자소서 ID
     * 출력: 자소서 소유 여부
     */
    public boolean isLetterOwner(String email, int id) {
        List<Integer> letterIdList = letterMapper.selectLetterId(email);
        for (int letterId : letterIdList) {
            if (letterId == id) {
                return true;
            }
        }
        return false;
    }

    /*
     * 자소서 목록 조회
     * 입력: Bearer 토큰
     * 출력: 성공 -> 자소서 목록 / 실패 -> 로그인 필요 메시지
     */
    public ResponseEntity<String> selectLetterHead(String bearer) {
        if (bearer == null || bearer.isEmpty()) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String email = memberService.getEmailFromBearer(bearer);
            if (!memberService.isLoggedin(bearer)) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "로그인이 필요합니다.")
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
            } else {
                List<Letter> letterList = letterMapper.selectLetterHead(email);
                Gson gson = new Gson();
                String responseJson = gson.toJson(letterList);
                return ResponseEntity.ok().body(responseJson);
            }
        }
    }

    /*
     * 자소서 내용 조회
     * 입력: Bearer 토큰, 자소서 ID
     * 출력: 성공 -> 자소서 내용 / 실패 -> 권한 없음 메시지
     */
    public ResponseEntity<String> selectLetterBody(String bearer, int id) {
        if (bearer == null || bearer.isEmpty()) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String email = memberService.getEmailFromBearer(bearer);
            if (!isLetterOwner(email, id)) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "권한이 없습니다.")
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
            } else {
                Letter letter = letterMapper.selectLetterBody(id);
                Gson gson = new Gson();
                String responseJson = gson.toJson(letter);
                return ResponseEntity.ok().body(responseJson);
            }
        }
    }

    /*
     * 자소서 수정
     * 입력: Bearer 토큰, 수정 자소서 내용, 자소서 ID
     * 출력: 성공 -> 자소서 수정 성공 메시지 / 실패 -> 권한 없음 메시지
     */
    public ResponseEntity<String> updateLetter(String bearer, Letter letter, int id) {
        if (bearer == null || bearer.isEmpty()) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String email = memberService.getEmailFromBearer(bearer);

            if (!isLetterOwner(email, id)) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "권한이 없습니다.")
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
            } else if (letter == null || letter.getTitle().length() == 0) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "제목을 입력해주세요.")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseJson);
            } else {
                Letter newLetter = new Letter();
                newLetter.setEmail(email);
                newLetter.setTitle(letter.getTitle());
                newLetter.setContent(letter.getContent());
                newLetter.setId(id);
                letterMapper.updateLetter(newLetter);
                String responseJson = jsonBuilder
                        .put("status", "success")
                        .put("message", "자소서가 수정되었습니다.")
                        .build();
                return ResponseEntity.ok().body(responseJson);
            }
        }
    }

    /*
     * 자소서 등록
     * 입력: Bearer 토큰, 자소서 내용
     * 출력: 성공 -> 자소서 등록 성공 메시지 / 실패 -> 권한 없음 메시지
     */
    public ResponseEntity<String> insertLetter(String bearer, Letter letter) {
        if (bearer == null || bearer.isEmpty()) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String email = memberService.getEmailFromBearer(bearer);

            if (!memberService.isLoggedin(bearer)) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "권한이 없습니다.")
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
            } else if (letter == null || letter.getTitle().length() == 0) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "제목을 입력해주세요.")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseJson);
            } else {
                Letter newLetter = new Letter();
                newLetter.setEmail(email);
                newLetter.setResume_id(letter.getResume_id());
                newLetter.setTitle(letter.getTitle());
                newLetter.setCompany(letter.getCompany());
                newLetter.setJob(letter.getJob());
                newLetter.setContent(letter.getContent());
                letterMapper.insertLetter(newLetter);
                String responseJson = jsonBuilder
                        .put("status", "success")
                        .put("message", "자소서가 추가되었습니다.")
                        .build();
                return ResponseEntity.ok().body(responseJson);
            }
        }
    }

    /*
     * 자소서 복제
     * 입력: Bearer 토큰, 자소서 ID
     * 출력: 성공 -> 자소서 복제 성공 메시지 / 실패 -> 권한 없음 메시지
     */
    public ResponseEntity<String> cloneLetter(String bearer, int id) {
        if (bearer == null || bearer.isEmpty()) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String email = memberService.getEmailFromBearer(bearer);

            if (!isLetterOwner(email, id)) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "권한이 없습니다.")
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
            } else {
                Letter letterBody = letterMapper.selectLetterBody(id);
                Letter newLetter = new Letter();
                newLetter.setEmail(email);
                newLetter.setTitle(letterBody.getTitle() + " - 복사본");
                newLetter.setContent(letterBody.getContent());
                letterMapper.insertLetter(newLetter);
                String responseJson = jsonBuilder
                        .put("status", "success")
                        .put("message", "자소서가 복제되었습니다.")
                        .build();
                return ResponseEntity.ok().body(responseJson);
            }
        }
    }

    /*
     * 자소서 삭제
     * 입력: Bearer 토큰, 자소서 ID
     * 출력: 성공 -> 자소서 삭제 성공 메시지 / 실패 -> 권한 없음 메시지
     */
    public ResponseEntity<String> deleteLetter(String bearer, int id) {
        if (bearer == null || bearer.isEmpty()) {
            String responseJson = jsonBuilder
                    .put("status", "fail")
                    .put("message", "로그인이 필요합니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
        } else {
            String email = memberService.getEmailFromBearer(bearer);

            if (!isLetterOwner(email, id)) {
                String responseJson = jsonBuilder
                        .put("status", "fail")
                        .put("message", "권한이 없습니다.")
                        .build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseJson);
            } else {
                letterMapper.deleteLetter(id);
                String responseJson = jsonBuilder
                        .put("status", "success")
                        .put("message", id + "번 자소서가 삭제되었습니다.")
                        .build();
                return ResponseEntity.ok().body(responseJson);
            }
        }
    }
}