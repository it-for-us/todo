package com.it4us.todoapp.dto;

import com.it4us.todoapp.entity.Workspace;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkspaceCreateDto {

    @Pattern(regexp = "^[a-z0-9_]{4,15}$", message=
            "value can contain only digits,alphabets or one time ' _ ' "+
                    "begin with number or letters but not a special character"+
                    "Workspacename must be of 4 to 15 length")
    private String name;
   

}
