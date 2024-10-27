package edu.bth.se.pa2577.tracker_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SignInResponse {
  private String userId;
  private String jwtToken;
  private String userName;
  private String name;
}
