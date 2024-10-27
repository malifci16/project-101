package edu.bth.se.pa2577.tracker_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SignInRequest {

  private String userName;
  private String password;
}
