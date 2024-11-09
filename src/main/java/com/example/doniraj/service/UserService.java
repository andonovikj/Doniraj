package com.example.doniraj.service;

import com.example.doniraj.models.User;

import java.util.List;

public interface UserService {
    List<User> getUsers();

    User getById(Long id);

    //register new user

    //optional find methods

    //update user

}
