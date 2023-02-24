package com.it4us.todoapp.exception;

public class BelongToAnotherUserException extends RuntimeException{
    public BelongToAnotherUserException(String message){
        super(message);
    }
}
