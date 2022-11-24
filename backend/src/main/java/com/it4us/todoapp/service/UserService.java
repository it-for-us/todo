package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.UserCreateDto;
import com.it4us.todoapp.dto.UserSignInDto;
import com.it4us.todoapp.dto.UserViewDto;

import java.util.Optional;

public interface UserService {
    UserViewDto create(UserCreateDto userCreateDto);
    Boolean isEmailExist(String email);

    Optional<?> login(UserSignInDto userSignInDto);
}
