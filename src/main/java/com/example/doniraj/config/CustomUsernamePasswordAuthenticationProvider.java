package com.example.doniraj.config;

import com.example.doniraj.service.UserService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustomUsernamePasswordAuthenticationProvider implements AuthenticationProvider {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public CustomUsernamePasswordAuthenticationProvider(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }
    // When a user submits login credentials, Spring Security creates an Authentication object authenticate which contains auth info
    // authenticate() verifies the user's credentials when they attempt to log in
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        if (username.isEmpty() || password.isEmpty()) {
            throw new BadCredentialsException("Empty credentials!");
        }

        UserDetails userDetails = this.userService.loadUserByUsername(username);

        // Compare the raw password (submitted by the user) with the encoded password stored in the database.

        //TODO FIX DIFFERENCE IN PASSWORDS BETWEEN USERS FROM DATA.SQL AND REGISTERED USERS ON PROD
        //if (!passwordEncoder.matches(password, userDetails.getPassword())) {
        if (!password.equals(userDetails.getPassword()))
        {
            throw new BadCredentialsException("Password is incorrect!");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());
    }

    // The supports method is part of the AuthenticationProvider interface in Spring Security.
    // It determines whether the AuthenticationProvider can handle a specific type of authentication.
    // In this case, it supports UsernamePasswordAuthenticationToken, which is the most common type used for username/password authentication.
    // If the supports method returns true, the AuthenticationProvider is used to authenticate the user.
    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(UsernamePasswordAuthenticationToken.class);
    }

}
