package com.it4us.todoapp.dto;


import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Data
public class UserSignInDto {

    @Email
    private String email;

    @Size(min = 8)
    private String password;


    //Alttaki 2 satiri cihat hocam eklemis
    private String token;

    private String username;

}
