package edu.bth.se.pa2577.tracker_api.controller;

import edu.bth.se.pa2577.tracker_api.dto.SignInRequest;
import edu.bth.se.pa2577.tracker_api.dto.SignInResponse;
import edu.bth.se.pa2577.tracker_api.entity.User;
import edu.bth.se.pa2577.tracker_api.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:4200", "http://budget-tracker-web-service:30002", "http://localhost:30002"})
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  // Sign-Up Endpoint
  @PostMapping("/signup")
  public SignInResponse signUp(@RequestBody User user) {
    return authService.signUp(user);
  }

  // Sign-In Endpoint
  @PostMapping("/signin")
  public SignInResponse signIn(@RequestBody SignInRequest request) {
    return authService.signIn(request.getUserName(), request.getPassword());
  }
}
