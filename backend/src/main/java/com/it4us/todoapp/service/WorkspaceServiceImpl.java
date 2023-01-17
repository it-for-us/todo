package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;
import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.entity.Workspace;
import com.it4us.todoapp.exception.*;
import com.it4us.todoapp.repository.UserRepository;
import com.it4us.todoapp.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;

    private final UserRepository userRepository;



    @Override
    public WorkspaceViewDto create(WorkspaceCreateDto workspaceCreateDto, String username) {
        Workspace workspace = new Workspace();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User is not found"));


        if (isWorkspaceExist(workspaceCreateDto.getName(), user.getUserId()))
            throw new WorkspaceExistException("Workspace is already exist");
        else if (isAValidWorkspaceName(workspaceCreateDto)) {
            workspace.setName(workspaceCreateDto.getName());
            workspace.setUser(user);
        }
        return WorkspaceViewDto.of(workspaceRepository.save(workspace));
    }

    @Override
    public Boolean isWorkspaceExist(String workspaceName, Long userId) {

        return workspaceRepository.isWorkspaceExistInUser(workspaceName, userId);
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
    public void deleteWorkspaceById(Long id, String username) {


        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User is not found"));


        Workspace workspace = workspaceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Workspace is not found"));


        if (user.getUsername().equals(workspace.getUser().getUsername())) {
            workspaceRepository.deleteById(id);
        }else throw new UnAuthorizedException("UnAuthorized Exception");
    }
}

