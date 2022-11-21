package com.it4us.todoapp.dto;

import com.it4us.todoapp.entity.User;

import java.io.Serializable;

public class UserViewDto implements Serializable {

    private static final long serialVersionUID = 1L;

    public String id;
    public String userName;
    public String email;

    private UserViewDto(String id, String userName, String email){
        this.id = id;
        this.userName = userName;
        this.email = email;
    }

    public static UserViewDto of(User user){
        return new UserViewDto(user.getId(), user.getUserName(), user.getEmail());
    }

}
