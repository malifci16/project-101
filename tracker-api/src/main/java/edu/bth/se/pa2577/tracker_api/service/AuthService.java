package edu.bth.se.pa2577.tracker_api.service;

import com.google.gson.Gson;
import edu.bth.se.pa2577.tracker_api.dto.SignInResponse;
import edu.bth.se.pa2577.tracker_api.entity.User;
import edu.bth.se.pa2577.tracker_api.exception.InvalidCredentialsException;
import edu.bth.se.pa2577.tracker_api.exception.UserAlreadyExistsException;
import edu.bth.se.pa2577.tracker_api.repository.UserRepository;
import edu.bth.se.pa2577.tracker_api.utls.GsonConfig;
import edu.bth.se.pa2577.tracker_api.utls.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;
  private final Gson gson;

  public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
    this.gson = GsonConfig.getGson();
  }

  // Sign-Up Method
  public SignInResponse signUp(User user) {
    log.info("Signing up user {}", gson.toJson(user));
    User existingUser = userRepository.findByUserName(user.getUserName());
    if (userRepository.findByUserName(user.getUserName()) != null) {
      log.info("Username {} already taken by userId {}", user.getUserName(), user.getId());
      throw new UserAlreadyExistsException("Username already taken");
    }
    if (userRepository.findByEmail(user.getEmail()) != null) {
      log.info("Email address {} already taken by userId {}", user.getUserName(), user.getId());
      throw new UserAlreadyExistsException("Email already registered");
    }

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user = userRepository.save(user);
    log.info("User has been created with userId {}", user.getId());
    return doAuthenticate(user.getName(), user.getUserName(), user.getId());
  }

  // Sign-In Method with JWT
  public SignInResponse signIn(String userName, String password) {
    log.info("Signing in user with userName {}", userName);
    User user = userRepository.findByUserName(userName);
    if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
      throw new InvalidCredentialsException("Invalid username or password");
    }
    return doAuthenticate(user.getName(), userName, user.getId());
  }

  private SignInResponse doAuthenticate(String name, String userName, String userId) {
    return SignInResponse.builder()
      .userName(userName)
      .name(name)
      .userId(userId)
      .jwtToken(jwtUtil.generateToken(userName, userId))
      .build();
  }
}

