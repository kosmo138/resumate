package resumate.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * @see https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-security-filters
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((auth) -> auth
            .requestMatchers("/api/resume/**", "/api/letter/**").hasRole("USER")
            .requestMatchers("/", "/api/login", "/index.html").permitAll()
            .anyRequest().authenticated());
        return http.build();
    }
}