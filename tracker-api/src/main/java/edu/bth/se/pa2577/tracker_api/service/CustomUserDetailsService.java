package edu.bth.se.pa2577.tracker_api.service;

import edu.bth.se.pa2577.tracker_api.entity.User;
import edu.bth.se.pa2577.tracker_api.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  public CustomUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUserName(username);
    if (user == null) {
      throw new UsernameNotFoundException("User not found with username: " + username);
    }

    // Convert User to Spring Security's UserDetails
    return new org.springframework.security.core.userdetails.User(
      user.getUserName(), user.getPassword(), new ArrayList<>()  // Empty authorities
    );
  }
}

