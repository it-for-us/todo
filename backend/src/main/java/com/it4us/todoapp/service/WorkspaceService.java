package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;

import javax.transaction.Transactional;

public interface WorkspaceService {

    WorkspaceViewDto create (WorkspaceCreateDto workspaceCreateDto);
    Boolean isWorkspaceExist(String workspaceName);
    Boolean isAValidWorkspaceName(WorkspaceCreateDto workspaceCreateDto);
    void deleteWorkspaceById(Long id);


    @Transactional
    void updateWorkspace(Long id, String username, String name);
}
