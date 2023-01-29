package com.it4us.todoapp.exception;

public class UserNameExistException extends RuntimeException {
    public UserNameExistException(String message) {
        super(message);
    }
}

