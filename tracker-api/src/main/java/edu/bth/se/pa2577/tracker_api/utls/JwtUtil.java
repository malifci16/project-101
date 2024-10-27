package edu.bth.se.pa2577.tracker_api.utls;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

public class JwtUtil {
  private final String encodedJWTKey;
  private final Key signingKey;
  private static final String AUTHORITIES_KEY = "auth";
  private static final String USER_ID_KEY = "userId";
  private static final String USER_NAME_KEY = "userName";

  public JwtUtil(String encodedJWTKey) {
    this.encodedJWTKey = encodedJWTKey;
    this.signingKey = decodeKeyFromBase64String(encodedJWTKey, SignatureAlgorithm.HS512);

  }
  public String generateToken(String userName, String userId) {
    return Jwts
      .builder()
      .setSubject(userName)
      .claim(AUTHORITIES_KEY, userName)
      .claim(USER_ID_KEY, userId)
      .claim(USER_NAME_KEY, userName)
      .signWith(signingKey, SignatureAlgorithm.HS512)  // Use HS512 for signing
      .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))  // Token expires in 30 minutes
      .compact();
  }

  // Extract username from token
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  // Extract expiration date
  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  // Helper to extract any claim
  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parser().setSigningKey(signingKey).parseClaimsJws(token).getBody();
  }

  // Check if token is expired
  // Check if token is expired
  private boolean isTokenExpired(String token) {
    Date expirationDate = Jwts.parserBuilder()
      .setSigningKey(signingKey)
      .build()
      .parseClaimsJws(token)
      .getBody()
      .getExpiration();
    return expirationDate.before(new Date());
  }

  // Validate token
  public Boolean validateToken(String token, String username) {
    final String tokenUsername = extractUsername(token);
    return (tokenUsername.equals(username) && !isTokenExpired(token));
  }

  // Method to decode Base64 string into Key object
  public static Key decodeKeyFromBase64String(String encodedKey, SignatureAlgorithm algorithm) {
    // Decode the Base64-encoded key
    byte[] decodedKey = Base64.getDecoder().decode(encodedKey);

    // Recreate the key from the decoded byte array
    return new SecretKeySpec(decodedKey, algorithm.getJcaName());
  }
}
