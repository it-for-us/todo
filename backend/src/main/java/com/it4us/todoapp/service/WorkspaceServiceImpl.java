package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;
import com.it4us.todoapp.entity.Workspace;
import com.it4us.todoapp.exception.*;
import com.it4us.todoapp.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;



    @Override
    public WorkspaceViewDto create(WorkspaceCreateDto workspaceCreateDto) {
        Workspace workspace = new Workspace();

        if (isWorkspaceExist(workspaceCreateDto.getName()))
            throw new WorkspaceExistException("Workspace is already exist");
        else if (isAValidWorkspaceName(workspaceCreateDto))
            workspace.setName(workspaceCreateDto.getName());

        return WorkspaceViewDto.of(workspaceRepository.save(workspace));
    }

    @Override
    public Boolean isWorkspaceExist(String workspaceName) {

        Optional<Workspace> workspace = workspaceRepository.findByName(workspaceName);

        return workspace.isPresent();
    }

    @Override
    public Boolean isAValidWorkspaceName(WorkspaceCreateDto workspaceCreateDto) {

        char[] workspaceNameToChar = workspaceCreateDto.getName().toCharArray();

        int countOf_ = 0;

        for (char c : workspaceNameToChar) {
            if ((c >= 'a' && c <= 'z')
                    || (c >= '0' && c <= '9')
                    || (c == ' ')
                    || (c == '_')) {
                if (c=='_'){
                    countOf_++;
                }
            }else
                throw new BadRequestException("Authorization Header or Workspace name is in incorrect format");
        }

        if (workspaceNameToChar.length<4 || workspaceNameToChar.length>15
                || workspaceNameToChar[0]=='_'|| countOf_>1)
            throw new BadRequestException("Authorization Header or Workspace name is in incorrect format");

        return true;
    }

    @Override
    public void deleteWorkspaceById(Long id) {

        Optional<Workspace> workspace = workspaceRepository.findById(id);

        if (workspace.isPresent()) {
            workspaceRepository.deleteById(id);
        }
    }

    @Override
    @Transactional
    public void updateWorkspace(Long id, String username, String name) {


        Workspace workspace=workspaceRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("workspace not found"));

        if(id==null|| name.length()==0){
            throw new IllegalStateException("Id or workspace is incorrect format");
        }

        Optional<Workspace> workspaceOptional=workspaceRepository.findWorkspaceByName(name);
        if(workspaceOptional.isPresent()){
            throw new IllegalStateException("workspace already exists");
        }
        if (username!=null&& id!=0 && name!=null){
            workspace.setId(id);
            workspace.setName(username);
            workspace.setName(name);
        }

    }
}

