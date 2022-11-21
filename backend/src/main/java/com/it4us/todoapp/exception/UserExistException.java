package com.it4us.todoapp.exception;

public class UserExistException extends RuntimeException{

    public UserExistException(String message){
        super(message);
    }
}
