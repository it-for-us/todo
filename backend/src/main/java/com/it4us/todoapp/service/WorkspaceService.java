package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;

public interface WorkspaceService {

    WorkspaceViewDto creat (WorkspaceCreateDto workspaceCreateDto);
    Boolean isWorkspaceExist(String workspaceName);
    void deleteWorkspaceById(Long id);

}
