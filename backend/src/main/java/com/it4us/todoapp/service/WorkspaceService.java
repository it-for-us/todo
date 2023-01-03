package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;

public interface WorkspaceService {

    WorkspaceViewDto create (WorkspaceCreateDto workspaceCreateDto);
    Boolean isWorkspaceExist(String workspaceName);
    Boolean isAValidWorkspaceName(WorkspaceCreateDto workspaceCreateDto);
    void deleteWorkspaceById(Long id);

}
