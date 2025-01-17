package com.example.doniraj.web;

import com.example.doniraj.config.JwtTokenUtil;
import com.example.doniraj.models.DTO.LoginRequestDTO;
import com.example.doniraj.models.DTO.UserDto;
import com.example.doniraj.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

    private final AuthService authService;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto)
    {
        return new ResponseEntity<>(authService.register(userDto), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDTO loginRequestDTO)
    {
        return new ResponseEntity<>(authService.login(loginRequestDTO), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request, HttpServletResponse response)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Spring Security treats even anonymous users as "authenticated" if the anonymous feature is enabled.
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
            return new ResponseEntity<>("User not logged in", HttpStatus.BAD_REQUEST);
        }

        authService.logout(request, response, authentication);
        return new ResponseEntity<>("Logout successful", HttpStatus.OK);
    }
}
