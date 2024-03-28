package resumate.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SecurityConfig {
    /**
     * BCrypt
     * - 해시 함수를 이용한 단방향 비밀번호 암호화 알고리즘
     * - BCrypt 알고리즘은 salt를 사용하여 해시값을 생성하므로 Rainbow Table 공격에 대한 보안성이 좋다.
     * 
     * @see https://velog.io/@smc9919/Spring-Security-Bcrypt의-salt는-무엇일까
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}