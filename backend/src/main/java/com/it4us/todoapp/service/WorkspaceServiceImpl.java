package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;
import com.it4us.todoapp.entity.Workspace;
import com.it4us.todoapp.exception.IncorrectWorkspaceNameException;
import com.it4us.todoapp.exception.WorkspaceExistException;
import com.it4us.todoapp.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;

    @Override
    public WorkspaceViewDto creat(WorkspaceCreateDto workspaceCreateDto) {

        int count_ = 0;
        for (char c : workspaceCreateDto.getName().toCharArray()){
            if (c=='_'){
                count_++;
            }
        }

        if(workspaceCreateDto.getName().charAt(0)=='_'|| count_>1){
            throw new IncorrectWorkspaceNameException("workspace name is in incorrect format");
        }else if(isWorkspaceExist(workspaceCreateDto.getName())){
            throw new WorkspaceExistException("Workspace already exist");
        }

        Workspace workspace = new Workspace();
        workspace.setName(workspaceCreateDto.getName());
        return WorkspaceViewDto.of(workspaceRepository.save(workspace));
    }

    @Override
    public Boolean isWorkspaceExist(String workspaceName) {
        Optional<Workspace> workspace = workspaceRepository.findByName(workspaceName);

        if (workspace.isPresent()){
            return true;
        }else return false;

    }
}

