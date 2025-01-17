package com.example.doniraj.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

/*      This class provides utility methods for working with JWT tokens.
        It handles token creation, extraction, and validation.
*/

@Component
public class JwtTokenUtil {

    //@Value("${jwt.secret}")
    //private String secret;

    //@Value("${jwt.expiration}")
    //private Long expiration;

    // Creates a JWT for a given username
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Token expires in 10 hours.
                .signWith(SignatureAlgorithm.HS512, "QWERTY") //  Uses HMAC-SHA512 algorithm and a secret key "QWERTY" to sign the token.
                .compact(); // Builds the final token string
    }

    // Checks if the token is valid by comparing the token’s username with the provided one and ensuring it’s not expired.
    public Boolean validateToken(String token, String username) {
        final String tokenUsername = getUsernameFromToken(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
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
        return claimsResolver.apply(claims);
    }

    // Parses and returns all claims using the secret key "QWERTY"
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey("QWERTY").parseClaimsJws(token).getBody();
    }

    // Checks if the token has expired by comparing its expiration date to the current date
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}