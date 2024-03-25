package resumate.server.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Configuration
public class JwtConfig {
    @Value("${jwt.secret}")
    private String secret;

    // https://stackoverflow.com/questions/55102937/how-to-create-a-spring-security-key-for-signing-a-jwt-token
    byte[] keyBytes = Decoders.BASE64.decode(this.secret);
    private final SecretKey secretKey = Keys.hmacShaKeyFor(keyBytes);

    public String issueAccessToken(String email) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + 1000 * 60 * 60 * 6); // 6시간
        // https://javadoc.io/doc/io.jsonwebtoken/jjwt-api/latest/io/jsonwebtoken/JwtBuilder.html
        return Jwts.builder()
                .subject(email)
                .issuedAt(now)
                .expiration(expirationDate)
                .signWith(secretKey)
                .compact();
    }

    public String getEmailFromToken(String access_token) {
        try {
            JwtParserBuilder jwtParserBuilder = Jwts.parser().verifyWith(secretKey);
            Claims claims = jwtParserBuilder.build().parseSignedClaims(access_token).getPayload();
            return claims.getSubject();
        } catch (Exception e) {
            return null;
        }
    }
}
