package com.it4us.todoapp.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(UserExistException.class)
    public ResponseEntity<?> userExist(UserExistException userExistException){
        ErrorResponse errorResponse = new ErrorResponse(userExistException.getMessage(),403);
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGlobalException(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse("internal server error",500);
        return new ResponseEntity<>(errorResponse,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(WorkspaceExistException.class)
    public ResponseEntity<?> workspaceExist(WorkspaceExistException workspaceExistException){
        ErrorResponse errorResponse = new ErrorResponse("workspace is already exist", 403);
        return new ResponseEntity<>(errorResponse,HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(IncorrectWorkspaceNameException.class)
    public ResponseEntity<?> incorrectWorkspaceName(IncorrectWorkspaceNameException incorrectWorkspaceNameException){
        ErrorResponse errorResponse = new ErrorResponse("workspace name is in incorrect format", 400);
        return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> incorrectWorkspaceName(MethodArgumentNotValidException ex){
        List<String> details = new ArrayList<>();

        for(ObjectError error : ex.getBindingResult().getAllErrors()) {
            details.add(error.getDefaultMessage());
        }
        String message = String.join(",", details);
        ErrorResponse errorResponse = new ErrorResponse("workspace name is in incorrect format \n"+message, 400);
        return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
    }

}
