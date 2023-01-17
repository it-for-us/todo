package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;

public interface WorkspaceService {

    WorkspaceViewDto create (WorkspaceCreateDto workspaceCreateDto, String username);
    Boolean isWorkspaceExist(String workspaceName, Long userId);
    Boolean isAValidWorkspaceName(WorkspaceCreateDto workspaceCreateDto);
    void deleteWorkspaceById(Long id, String username);

}
