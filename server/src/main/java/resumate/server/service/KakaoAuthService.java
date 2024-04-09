package resumate.server.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.view.RedirectView;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import resumate.server.config.JsonBuilder;
import resumate.server.config.JwtConfig;
import resumate.server.config.SecurityConfig;
import resumate.server.dto.Member;

@Service
@RequiredArgsConstructor
public class KakaoAuthService {
    private final MemberService memberService;
    private final JwtConfig jwtConfig;
    private final SecurityConfig securityConfig;
    private final JsonBuilder jsonBuilder;

    @Value("${kakao.apikey}")
    private String kakaoApiKey;

    @Value("${kakao.redirect_uri}")
    private String redirectUri;

    public RedirectView kakaoAuth(String code, HttpServletResponse response) {
        final String tokenJson = getTokenJson(code);
        final String accessToken = getIdTokenFromJson(tokenJson);
        final String email = jwtConfig.getEmailFromToken(accessToken);
        // checkMemberMail: 신규 회원이라면 true, 기존 회원이라면 false
        if (memberService.checkMemberMail(email)) {
            registerKakaoMember(email);
        }
        Cookie cookie = new Cookie("authorization", accessToken);
        cookie.setPath("/");
        response.addCookie(cookie);
        return new RedirectView("http://localhost/");
    }

    private void registerKakaoMember(String email) {
        final String now = Long.toString(new Date().getTime());
        final String rawPassword = "kakao_" + email + now;
        final String password = securityConfig.passwordEncoder().encode(rawPassword);
        Member member = new Member();
        member.setEmail(email);
        member.setPassword(password);
        memberService.insertMember(member);
    }

    private String getTokenJson(String code) {
        final String requestBody = "grant_type=authorization_code" + "&client_id=" + kakaoApiKey
                + "&redirect_uri=" + redirectUri + "&code=" + code;
        final WebClient client = WebClient.create();
        final String tokenJson = client.post()
                .uri("https://kauth.kakao.com/oauth/token")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .bodyValue(requestBody)
                .retrieve().bodyToMono(String.class).block();
        return tokenJson;
    }

    private String getIdTokenFromJson(String json) {
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(json, JsonObject.class);
        return jsonObject.get("id_token").getAsString();
    }
}
