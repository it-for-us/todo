package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;
import com.it4us.todoapp.entity.Workspace;

import javax.transaction.Transactional;

public interface WorkspaceService {

    WorkspaceViewDto create (WorkspaceCreateDto workspaceCreateDto, String username);
    WorkspaceViewDto getWorkspaceById(Long workspaceId);
    Workspace findWorkspaceById (Long workspaceId);
    void deleteWorkspaceById(Long id, String username);
    @Transactional
    void updateWorkspace(Long id, String username, String name);

}
