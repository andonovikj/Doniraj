package com.example.doniraj.service.impl;

import com.example.doniraj.models.City;
import com.example.doniraj.models.User;
import com.example.doniraj.repository.UserRepository;
import com.example.doniraj.service.UserCityService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class UserCityServiceImpl implements UserCityService {

    private final UserRepository userRepository;

    public UserCityServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public int reassignUsersToCity(City oldCity, City newCity) {
        return userRepository.reassignUsersToNewCity(oldCity, newCity);
    }
}
