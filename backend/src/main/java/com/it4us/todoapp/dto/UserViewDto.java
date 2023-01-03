package com.it4us.todoapp.dto;

import com.it4us.todoapp.entity.User;

import java.io.Serializable;

public class UserViewDto implements Serializable {

    private static final long serialVersionUID = 1L;

    public String id;
    public String username;
    public String email;

    private UserViewDto(String id, String username, String email){
        this.id = id;
        this.username = username;
        this.email = email;
    }

    public static UserViewDto of(User user){
        return new UserViewDto(user.getId(), user.getUsername(), user.getEmail());
    }

}
