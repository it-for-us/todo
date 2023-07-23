package com.it4us.todoapp.exception;

public class ListBelongsToAnotherUserException extends RuntimeException {
    public ListBelongsToAnotherUserException(String message) {
        super(message);
    }
}
