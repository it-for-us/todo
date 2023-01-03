package com.it4us.todoapp.dto;

import com.it4us.todoapp.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSignInResponse {

    private String email;

    private String token;

    private String username;

    public static UserSignInResponse of (User user){
        return new UserSignInResponse(user.getEmail(), null, user.getUsername());
    }
}
