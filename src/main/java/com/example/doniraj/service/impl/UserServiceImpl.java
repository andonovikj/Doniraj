package com.example.doniraj.service.impl;

import com.example.doniraj.models.City;
import com.example.doniraj.models.DTO.LoginRequestDTO;
import com.example.doniraj.models.DTO.UserDto;
import com.example.doniraj.models.User;
import com.example.doniraj.models.exception.InvalidCityIdException;
import com.example.doniraj.models.exception.InvalidUserIdException;
import com.example.doniraj.models.exception.InvalidUsernameOrPasswordException;
import com.example.doniraj.service.CityService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import com.example.doniraj.repository.UserRepository;
import com.example.doniraj.service.UserService;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final CityService cityService;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, CityService cityService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.cityService = cityService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new InvalidCityIdException(id));
    }

//    @Override
//    public User create(UserDto userdto){
//        String encodedPassword = passwordEncoder.encode(userdto.getPassword());
//        City city = cityService.getById(userdto.getCity_id());
//        User user = new User(userdto.getName(), userdto.getEmail(), encodedPassword, userdto.getPhone_number(), userdto.getRole(), city);
//        return userRepository.save(user);
//    }

    @Override
    public User update(Long user_id, UserDto userdto) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new InvalidUserIdException(user_id));

        user.setName(userdto.getName());
        user.setEmail(userdto.getEmail());
        City city = cityService.getById(userdto.getCity_id());
        //City city = cityRepository.findById(userdto.getCity_id()).orElseThrow(() -> new InvalidCityIdException(userdto.getCity_id()));
        user.setCity(city);
        user.setRole(userdto.getRole());
        user.setPhone_number(userdto.getPhone_number());

        if (userdto.getPassword() != null && !userdto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(userdto.getPassword()));
        }

        return userRepository.save(user);
    }

    @Override
    public User delete(Long user_id){
        User user = userRepository.findById(user_id).orElseThrow(() -> new InvalidUserIdException(user_id));
        userRepository.delete(user);
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        return userRepository.findByName(name);//.orElseThrow(()->new UsernameNotFoundException(name));
        /* This works if User doesn't implement UserDetails
        return new org.springframework.security.core.userdetails.User(
                user.getName(),
                user.getPassword(),
                Collections.singletonList(user.getRole())
        );*/
    }
}
