package com.it4us.todoapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Pattern;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkspaceCreateDto {

    @Pattern(regexp = "^[a-z0-9_]{4,15}$")
    private String name;
   

}
