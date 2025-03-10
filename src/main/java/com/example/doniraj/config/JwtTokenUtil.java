package com.example.doniraj.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;

import java.util.Date;
import java.util.function.Function;

/*      This class provides utility methods for working with JWT tokens.
        It handles token creation, extraction, and validation.
*/

@Component
public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private String secret;

    private final SecretKey secretKey;

    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret}") String secret) {
        //this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512); // Secure key;
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);

        System.out.println("Signing Key: " + Base64.getEncoder().encodeToString(secretKey.getEncoded()));

    }

    // ADD THIS METHOD SO ROLE WORKS AS STRING
    public String getRoleFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return claims.get("role", String.class); // Extracts "ADMIN", "DONOR", etc.
    }

    // Creates a JWT for a given username
    public String generateToken(String username, Long user_id, String role) {
        System.out.println("Stored Role in JWT: " + role);
        return Jwts.builder()
                .setSubject(username)
                .claim("user_id", user_id)  // Add user ID claim
                .claim("role", role)       // Add role claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 30 * 60 * 1000 )) // Token expires in 30 minutes.
                .signWith(secretKey)
                .compact(); // Builds the final token string


    }

    // Checks if the token is valid by comparing the token’s username with the provided one and ensuring it’s not expired.
    public Boolean validateToken(String token, String username) {
        try {
            final String tokenUsername = getUsernameFromToken(token);
            return (tokenUsername.equals(username) && !isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }


    }

    // Extracts the username from the token using getClaimFromToken
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    // Extracts the expiration date from the token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    // A generic method to extract any claim from the token.
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        System.out.println("Received JWT: " + token);
        System.out.println("Role: " + claims.get("role"));
        return claimsResolver.apply(claims);
    }

    // Parses and returns all claims using the secret key "QWERTY"
    private Claims getAllClaimsFromToken(String token) {
        //return Jwts.parser().setSigningKey("QWERTY").parseClaimsJws(token).getBody();

        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();

    }

    // Checks if the token has expired by comparing its expiration date to the current date
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}