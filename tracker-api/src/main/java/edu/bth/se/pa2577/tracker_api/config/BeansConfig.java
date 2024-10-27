package edu.bth.se.pa2577.tracker_api.config;

import edu.bth.se.pa2577.tracker_api.utls.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BeansConfig {

  @Value("${budget-tracker.config.jwt-key-encoded}")
  private String encodedJWTKey;

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public JwtUtil jwtUtil() {
    return new JwtUtil(encodedJWTKey);
  }
}
