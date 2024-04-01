package resumate.server.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Configuration
public class JwtConfig {
    /**
     * Value annotation 이후 null 문제 해결
     * (1) application.yml의 jwt.secret 속성 일치 확인
     * (2) JwtConfig가 Spring Bean으로 정상 등록됨
     * (3) static 변수 아님
     * (4) new JwtConfig()으로 인스턴스화하지 않음
     * -> 생성자를 통한 의존성 주입으로 인스턴스화 시점에 secretKey 초기화
     * 
     * @see https://velog.io/@tidavid1/Spring에서-Value의-값은-언제-반영될까
     */
    private SecretKey secretKey;

    public JwtConfig(@Value("${jwt.secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    /*
     * 입력: 로그인 이메일 주소
     * 출력: JWT 토큰 (수명: 6시간)
     * 
     * @see https://javadoc.io/doc/io.jsonwebtoken/jjwt-api/latest/io/jsonwebtoken/
     * JwtBuilder.html
     */
    public String issueAccessToken(String email) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + 1000 * 60 * 60 * 6);
        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(expirationDate)
                .signWith(secretKey)
                .compact();
    }

    /*
     * 입력: JWT 토큰
     * 출력: 로그인 이메일 주소
     */
    public String getEmailFromToken(String access_token) {
        try {
            JwtParserBuilder jwtParserBuilder = Jwts.parser().verifyWith(secretKey);
            Claims claims = jwtParserBuilder.build().parseSignedClaims(access_token).getPayload();
            return claims.getSubject();
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
            return null;
        }
    }

    /*
     * 입력: JWT 토큰
     * 출력: 토큰 만료 여부 (true: 통과 / false: 만료)
     */
    public boolean checkExpiration(String access_token) {
        try {
            JwtParserBuilder jwtParserBuilder = Jwts.parser().verifyWith(secretKey);
            Claims claims = jwtParserBuilder.build().parseSignedClaims(access_token).getPayload();
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
