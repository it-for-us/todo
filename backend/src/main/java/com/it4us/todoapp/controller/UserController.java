package com.it4us.todoapp.controller;

import com.it4us.todoapp.dto.UserCreateDto;
import com.it4us.todoapp.dto.UserViewDto;
import com.it4us.todoapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserViewDto> createUser(@Valid @RequestBody UserCreateDto userCreateDto){
        UserViewDto user = userService.create(userCreateDto);
        return ResponseEntity.ok(user);
    }


}
