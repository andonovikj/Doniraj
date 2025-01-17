package com.example.doniraj.service;

import com.example.doniraj.models.DTO.LoginRequestDTO;
import com.example.doniraj.models.DTO.UserDto;
import com.example.doniraj.models.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthService {
    User register(UserDto userDto);

    String login(LoginRequestDTO loginRequestDTO);

    void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication);

    UserDetails loadUserByUsername(String name);
}
