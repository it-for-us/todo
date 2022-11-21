package com.it4us.todoapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(UserExistException.class)
    public ResponseEntity<?> userExist(UserExistException userExistException){
        ErrorResponse errorResponse = new ErrorResponse(userExistException.getMessage(),403);
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }
}
