package com.example.doniraj.service;

import com.example.doniraj.models.DTO.UserDto;
import com.example.doniraj.models.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> getUsers();

    User getById(Long id);

    //public User create(UserDto userdto);

    public User update(Long user_id, UserDto userdto);

    public User delete(Long user_id);

    User register(UserDto userDto);

    User login(UserDetails userDetails);

    UserDetails loadUserByUsername(String name);
}
