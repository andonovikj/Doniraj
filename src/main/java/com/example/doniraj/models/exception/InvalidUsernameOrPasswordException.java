package com.example.doniraj.models.exception;


public class InvalidUsernameOrPasswordException extends RuntimeException{
    public InvalidUsernameOrPasswordException() { super(String.format("InvalidUsernameOrPasswordException")); }

}
