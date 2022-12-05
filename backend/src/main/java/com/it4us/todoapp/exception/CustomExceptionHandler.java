package com.it4us.todoapp.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(UserExistException.class)
    public ResponseEntity<?> userExist(UserExistException userExistException){
        ErrorResponse errorResponse = new ErrorResponse(userExistException.getMessage(),403);
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<Object> handleGlobalException(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse("internal server error",500);
        return new ResponseEntity<>(errorResponse,HttpStatus.INTERNAL_SERVER_ERROR);
    }

//    @ExceptionHandler(UserNotExistException.class)
//    public ResponseEntity<?> userNotExist(UserNotExistException userNotExistException){
//        ErrorResponse errorResponse = new ErrorResponse(userNotExistException.getMessage(),404);
//        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
//
//    }






}
