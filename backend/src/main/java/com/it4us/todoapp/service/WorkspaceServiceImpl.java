package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;
import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.entity.Workspace;
import com.it4us.todoapp.exception.*;
import com.it4us.todoapp.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final UserService userService;
    private final BoardService boardService;


    @Override
    public WorkspaceViewDto create(WorkspaceCreateDto workspaceCreateDto) {
        User user = userService.getUserById(workspaceCreateDto.getUserId()); //Control the User if exists

        Workspace workspace = new Workspace();

        if (isWorkspaceExist(workspaceCreateDto.getName()))
            throw new WorkspaceExistException("Workspace is already exist");
        else if (isAValidWorkspaceName(workspaceCreateDto)) {
            workspace.setName(workspaceCreateDto.getName());
            workspace.setUser(user);
        }
        return WorkspaceViewDto.of(workspaceRepository.save(workspace), null);
    }

    @Override
    public WorkspaceViewDto getWorkspaceById(Long workspaceId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new WorkspaceNotFoundException("Workspace is not found."));

        if (IsWorkspaceBelongedUser(workspace, username)) {
            List<BoardViewDto> boards = boardService.getAllBoards(Optional.of(workspaceId));
            return WorkspaceViewDto.of(workspace, boards);
        } else
            throw new WorkspaceBelongAnotherUserException("Workspace is belonged to another user.");
    }

    private boolean IsWorkspaceBelongedUser(Workspace workspace, String username) { //????
        return workspace.getUser().getUsername().equals(username);
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
                if (c == '_') {
                    countOf_++;
                }
            } else
                throw new BadRequestException("Authorization Header or Workspace name is in incorrect format");
        }

        if (workspaceNameToChar.length < 4 || workspaceNameToChar.length > 15
                || workspaceNameToChar[0] == '_' || countOf_ > 1)
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
}

