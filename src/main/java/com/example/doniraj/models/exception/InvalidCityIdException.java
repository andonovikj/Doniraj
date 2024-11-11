package com.example.doniraj.models.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InvalidCityIdException extends RuntimeException {
    public InvalidCityIdException(Long id) {
        super(String.format("City with id: %d was not found", id));
    }

}
