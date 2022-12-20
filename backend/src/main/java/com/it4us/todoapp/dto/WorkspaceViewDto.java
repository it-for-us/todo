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
public class WorkspaceViewDto {

    private Long id;
    private String name;

    public static WorkspaceViewDto of(Workspace workspace){
        return new WorkspaceViewDto(workspace.getId(),workspace.getName());
    }
}
