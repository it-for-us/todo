package com.it4us.todoapp.exception;

public class WorkspaceExistException extends RuntimeException{

    public WorkspaceExistException(String message){
        super(message);
    }
}
