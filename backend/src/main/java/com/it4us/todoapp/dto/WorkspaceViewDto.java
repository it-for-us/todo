package com.it4us.todoapp.dto;

import com.it4us.todoapp.entity.Workspace;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkspaceViewDto {

    private Long id;
    private String name;
    private List<BoardViewDto> boards;

    public static WorkspaceViewDto of(Workspace workspace, List<BoardViewDto> boards) {
        return new WorkspaceViewDto(workspace.getId(), workspace.getName(), boards);
    }
}
