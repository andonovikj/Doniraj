package com.example.doniraj.service.impl;

import org.springframework.stereotype.Service;
import com.example.doniraj.repository.UserRepository;
import com.example.doniraj.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public String getUserDetails() {
        return "Hello from user service impl";
    }
}