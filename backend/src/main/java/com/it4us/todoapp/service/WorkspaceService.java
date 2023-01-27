package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;

import javax.transaction.Transactional;

public interface WorkspaceService {
    WorkspaceViewDto create (WorkspaceCreateDto workspaceCreateDto, String username);
    WorkspaceViewDto getWorkspaceById(Long workspaceId);

    Boolean isWorkspaceExist(String workspaceName, Long userId);
    Boolean isAValidWorkspaceName(WorkspaceCreateDto workspaceCreateDto);
    void deleteWorkspaceById(Long id, String username);
    
    @Transactional
   void updateWorkspace(Long id, String username, String name);

}
