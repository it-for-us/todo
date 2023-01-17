package com.it4us.todoapp.controller;

import com.it4us.todoapp.dto.UserCreateDto;
import com.it4us.todoapp.dto.UserSignInDto;
import com.it4us.todoapp.dto.UserSignInResponse;
import com.it4us.todoapp.dto.UserViewDto;
import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.exception.UnAuthorizedException;
import com.it4us.todoapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<UserViewDto> createUser(@Valid @RequestBody UserCreateDto userCreateDto){
        UserViewDto user = userService.create(userCreateDto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/signin")
    public ResponseEntity<UserSignInResponse> signin(@Valid @RequestBody UserSignInDto userSignInDto){

        User user = userService.findByEmail(userSignInDto.getEmail());

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), userSignInDto.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw  new UnAuthorizedException(e.getMessage());
        }


        UserSignInResponse signInResponse = userService.login(userSignInDto);
        return ResponseEntity.ok(signInResponse);
    }
}
