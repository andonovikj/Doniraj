package com.example.doniraj.service.impl;

import com.example.doniraj.models.User;
import com.example.doniraj.models.exception.InvalidCityIdException;
import com.example.doniraj.models.exception.InvalidUserIdException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.doniraj.repository.UserRepository;
import com.example.doniraj.service.UserService;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new InvalidCityIdException(id));
    }
}
