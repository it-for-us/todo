package com.it4us.todoapp.exception;

public class BoardExistException extends RuntimeException{

    public BoardExistException(String message){
        super(message);
    }

}
