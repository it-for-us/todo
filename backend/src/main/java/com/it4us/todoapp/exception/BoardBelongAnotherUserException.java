package com.it4us.todoapp.exception;

public class BoardBelongAnotherUserException extends RuntimeException {
    public BoardBelongAnotherUserException(String message) {
        super(message);
    }
}
