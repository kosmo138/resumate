package resumate.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
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

    /**
     * CSRF (Cross-Site Request Forgery) protection
     * 기본값으로 활성화되어 있어 상태 변경이 가능한 HTTP 메서드에 대해 CSRF 토큰을 요구한다.
     * GET은 문제 없으나 POST, PUT, DELETE 메소드에 대해 CSRF 토큰을 요구한다.
     * 토큰이 없는 POST 요청에 대해서 403 Forbidden 에러를 반환한다.
     * 따라서, "/api/*" 경로에 대한 요청에 대해서는 CSRF 보호를 비활성화한다.
     * 
     * @see https://velog.io/@woohobi/Spring-security-csrf란
     * @see https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html#disable-csrf
     * @see https://hou27.tistory.com/entry/Spring-Boot-Spring-Security-적용하기-암호화
     */
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf) -> csrf.ignoringRequestMatchers("/api/*"))
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/api/resume/*", "/api/letter/*").hasRole("USER")
                        .requestMatchers("/api/member", "/api/login").permitAll()
                        .anyRequest().authenticated());
        return http.build();
    }
}