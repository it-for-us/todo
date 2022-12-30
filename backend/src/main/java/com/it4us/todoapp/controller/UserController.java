package com.it4us.todoapp.controller;

import com.it4us.todoapp.dto.UserCreateDto;
import com.it4us.todoapp.dto.UserSignInDto;
import com.it4us.todoapp.dto.UserSignInResponse;
import com.it4us.todoapp.dto.UserViewDto;
import com.it4us.todoapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;



@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<UserViewDto> createUser(@Valid @RequestBody UserCreateDto userCreateDto){

        UserViewDto user = userService.create(userCreateDto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/signin")
    public ResponseEntity<UserSignInResponse> signin(@Valid @RequestBody UserSignInDto userSignInDto){

            UserSignInResponse signInResponse = userService.login(userSignInDto);
            return ResponseEntity.ok(signInResponse);
    }
}
