package com.example.doniraj.models.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

//@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UsernameAlreadyExistsException extends RuntimeException{
    public UsernameAlreadyExistsException(String name) { super(String.format("User with name: %s already exists.", name)); }

}
