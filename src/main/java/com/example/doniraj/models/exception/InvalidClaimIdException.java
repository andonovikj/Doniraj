package com.example.doniraj.models.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InvalidClaimIdException extends RuntimeException{
    public InvalidClaimIdException(Long id) {  super(String.format("Claim with id: %d was not found", id)); }
}
