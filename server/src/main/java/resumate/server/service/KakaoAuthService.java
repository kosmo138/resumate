package resumate.server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KakaoAuthService {
    @Value("${kakao.apikey}")
    private String kakaoApiKey;

    @Value("${kakao.redirect_uri}")
    private String redirectUri;

    /*
     * 카카오 로그인
     * 입력: 인가 code
     * 출력: 테스트용 JSON
     */
    public ResponseEntity<String> kakaoAuth(String code) {
        final String token = getToken(code);
        System.out.println("[Debug] KakaoAuthService code: " + code);
        return ResponseEntity.ok().body(token);
    }

    private String getToken(String code) {
        final String requestBody = "grant_type=authorization_code" + "&client_id=" + kakaoApiKey
                + "&redirect_uri=" + redirectUri + "&code=" + code;
        System.out.println("[Debug] KakaoAuthService requestBody: " + requestBody);
        final WebClient client = WebClient.create();
        final String tokenJson = client.post()
                .uri("https://kauth.kakao.com/oauth/token")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .bodyValue(requestBody)
                .retrieve().bodyToMono(String.class).block();
        System.out.println("[Debug] KakaoAuthService tokenJson: " + tokenJson);
        return tokenJson;
    }
}
