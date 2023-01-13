package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.UserCreateDto;
import com.it4us.todoapp.dto.UserSignInDto;
import com.it4us.todoapp.dto.UserSignInResponse;
import com.it4us.todoapp.dto.UserViewDto;
import com.it4us.todoapp.entity.User;

public interface UserService {

    UserViewDto create(UserCreateDto userCreateDto);
    User getUserById(Long userId);
    Boolean isEmailExist(String email);
    String createUsernameIfNoPresent(UserCreateDto userCreateDto);
    UserSignInResponse login(UserSignInDto userSignInDto);
    User findByEmail(String email);

}
