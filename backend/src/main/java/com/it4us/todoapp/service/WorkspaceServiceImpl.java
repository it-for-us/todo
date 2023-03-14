package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;
import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.entity.Workspace;
import com.it4us.todoapp.exception.*;
import com.it4us.todoapp.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.it4us.todoapp.utilities.LoggedUsername;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {

    @Autowired
    private WorkspaceRepository workspaceRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private BoardService boardService;

    @Override
    public WorkspaceViewDto create(WorkspaceCreateDto workspaceCreateDto, String username) {
        User user = userService.findByUsername(username);

        if (isWorkspaceExist(workspaceCreateDto.getName(), user.getUserId()))
            throw new AlreadyExistException("Workspace is already exist");
        if (!isAValidWorkspaceName(workspaceCreateDto.getName()))
            throw new BadRequestException("Authorization Header or Workspace name is in incorrect format");

        Workspace workspace = new Workspace();
        workspace.setName(workspaceCreateDto.getName());
        workspace.setUser(user);

        return WorkspaceViewDto.of(workspaceRepository.save(workspace), null);
    }

    @Override
    public WorkspaceViewDto getWorkspaceById(Long workspaceId) {
        String username = LoggedUsername.getUsernameFromAuthentication();
        Workspace workspace = findWorkspaceById(workspaceId);

        if (isWorkspaceBelongsToUser(workspace, username)) {
            List<BoardViewDto> boards = boardService.getAllBoards(Optional.of(workspaceId));
            return WorkspaceViewDto.of(workspace, boards);
        } else throw new WorkspaceBelongAnotherUserException("Workspace is belonged to another user.");
    }

    @Override
    public Workspace findWorkspaceById(Long workspaceId) {
        return workspaceRepository.findById(workspaceId).
                orElseThrow(() -> new WorkspaceNotFoundException("Workspace is not found."));
    }

    @Override
    public void deleteWorkspaceById(Long id, String username) {
        Workspace workspace = workspaceRepository.findById(id).orElseThrow(() -> new NotFoundException("Workspace is not found"));
        if (!isWorkspaceBelongsToUser(workspace, username)) {
            throw new UnAuthorizedException("UnAuthorized Exception");
        }
        workspaceRepository.deleteById(id);
    }

    @Override
    public List<WorkspaceViewDto> getAllWorkspacesOfUser() {
        return null;
    }

    @Override
    @Transactional
    public void updateWorkspace(Long id, String username, String name) {
        Workspace workspace = workspaceRepository.findById(id).orElseThrow(() -> new IllegalStateException("workspace is not found"));
        if (name.length() == 0) {
            throw new IllegalStateException("Id or workspace is incorrect format");
        }

        Optional<Workspace> workspaceOptional = workspaceRepository.findByName(name);
        if (workspaceOptional.isPresent()) {
            throw new IllegalStateException("workspace already exists");
        }

        if (username != null && id != 0) {
            workspace.setId(id);
            workspace.setName(username);
            workspace.setName(name);
        }
    }

    public Boolean isWorkspaceExist(String workspaceName, Long userId) {
        return workspaceRepository.isWorkspaceExistInUser(workspaceName, userId);
    }

    @Override
    public Boolean isAValidWorkspaceName(WorkspaceCreateDto workspaceCreateDto) {
        return null;
    }

    private boolean isAValidWorkspaceName(String workspaceName) {

        char[] workspaceNameToChar = workspaceName.toCharArray();

        int countOf_ = 0;
        for (char c : workspaceNameToChar) {
            if (c == '_') {
                countOf_++;
                if (countOf_ > 1)
                    return false;
            } else if (!((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || (c == ' '))) {
                return false;
            }
        }
        return  (workspaceNameToChar.length > 4 && workspaceNameToChar.length < 15 && workspaceNameToChar[0] != '_');
    }

    private boolean isWorkspaceBelongsToUser(Workspace workspace, String username) {
        return workspace.getUser().getUsername().equals(username);
    }

    private WorkspaceViewDto convertWorkspaceToWorkspaceViewDto(Workspace workspace) {
        List<BoardViewDto> boards = boardService.getAllBoards(Optional.of(workspace.getId()));
        return WorkspaceViewDto.of(workspace, boards);
    }
}

