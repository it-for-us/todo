package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.WorkspaceCreateDto;
import com.it4us.todoapp.dto.WorkspaceViewDto;
import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.entity.Workspace;
import com.it4us.todoapp.exception.*;
import com.it4us.todoapp.repository.WorkspaceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WorkspaceServiceImplTest {
    @Mock
    private WorkspaceRepository workspaceRepository;
    @Mock
    private UserService userService;
    @Mock
    private BoardService boardService;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private WorkspaceServiceImpl underTest;
    @Captor
    private ArgumentCaptor<Workspace> workspaceArgumentCaptor;


    @BeforeEach
    void setUp() {
        underTest = new WorkspaceServiceImpl(workspaceRepository, userService, boardService);
    }

    @Test
    void itShouldCreate() {
        // Given a workspace name and a username
        String userName = "userTest";
        Long userId = 1L;
        User user = new User(userId, null, userName, "test@gmail.com", "testPassword");
        String workspaceName = "testworkspace";

        // ... a request
        WorkspaceCreateDto workspaceCreateDto = new WorkspaceCreateDto(workspaceName, userId);
        long workspaceId = 1L;

        Workspace workspace = Workspace
                .builder()
                .id(workspaceId)
                .name(workspaceName)
                .user(user)
                .build();

        // ... Valid username
        given(userService.findByUsername(userName))
                .willReturn(user);

        // ... Workspace name does not exist for the user.
        given(workspaceRepository.isWorkspaceExistInUser(workspaceName, user.getUserId()))
                .willReturn(false);

        // ... workspace is saved successfully.
        given(workspaceRepository.save(any(Workspace.class)))
                .willReturn(workspace);

        //When
        WorkspaceViewDto result = underTest.create(workspaceCreateDto, userName);

        //Then
        //verify(userService).findByUsername(userName);
        then(userService).should().findByUsername(userName);
        //verify(workspaceRepository).isWorkspaceExistInUser(anyString(), anyLong());
        then(workspaceRepository).should().isWorkspaceExistInUser(anyString(), anyLong());
        //verify(workspaceRepository).save(workspaceArgumentCaptor.capture());
        then(workspaceRepository).should().save(workspaceArgumentCaptor.capture());

        Workspace capturedWorkspace = workspaceArgumentCaptor.getValue();
        assertThat(capturedWorkspace).isEqualTo(new Workspace(null, workspaceName, user));

        WorkspaceViewDto expected = new WorkspaceViewDto(workspaceId, workspaceName, null);
        assertThat(result).isEqualTo(expected);
    }

    @Test
    void itShouldThrowWhenWorkspaceNameAlreadyExist() {
        // Given
        String userName = "userTest";
        Long userId = 1L;
        User user = new User(userId, null, userName, "test@gmail.com", "testPassword");
        String workspaceName = "testworkspace";

        // ... a request
        WorkspaceCreateDto workspaceCreateDto = new WorkspaceCreateDto(workspaceName, userId);

        // ... Valid username
        given(userService.findByUsername(user.getUsername()))
                .willReturn(user);

        // ... Workspace name does not exist for the user.
        given(workspaceRepository.isWorkspaceExistInUser(workspaceName, userId))
                .willReturn(true);

        // When
        // Then
        assertThatThrownBy(() -> underTest.create(workspaceCreateDto, userName))
                .isInstanceOf(AlreadyExistException.class)
                .hasMessageContaining("Workspace is already exist");

        //verify(workspaceRepository, never()).save(any());
        then(workspaceRepository).should(never()).save(any());
    }

    @ParameterizedTest
    @CsvSource({"testWorkspace", "test_workspace_", "1123"})
    void itShouldThrowWhenWorkspaceNameIsNotValid(String workspaceName) {
        // Given
        String userName = "userTest";
        Long userId = 1L;
        User user = new User(userId, null, userName, "test@gmail.com", "testPassword");

        // ... a request
        WorkspaceCreateDto workspaceCreateDto = new WorkspaceCreateDto(workspaceName, userId);

        // ... Valid username
        given(userService.findByUsername(user.getUsername()))
                .willReturn(user);
        // ... Invalid workspace name
        given(workspaceRepository.isWorkspaceExistInUser(workspaceName, userId))
                .willReturn(false);

        //When
        //Then
        assertThatThrownBy(() -> underTest.create(workspaceCreateDto, userName))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Authorization Header or Workspace name is in incorrect format");

        then(workspaceRepository).should(never()).save(any());
    }

    @Test
    void itShouldGetWorkspaceById() {
        // Given
        String loggedUsername = "loggedUsernameTest";
        Long workspaceId = 1L;
        User user = new User(1L, null, loggedUsername, "test@gmail.com", "testPassword");
        String workspaceName = "workspaceName";

        Workspace workspace = Workspace
                .builder()
                .id(workspaceId)
                .name(workspaceName)
                .user(user)
                .build();

        // ... logged username
        SecurityContextHolder.getContext().setAuthentication(authentication);
        given(authentication.getName()).willReturn(loggedUsername);


        //... workspace exists
        given(workspaceRepository.findById(workspaceId)).willReturn(Optional.ofNullable(workspace));

        // ... get boards
        given(boardService.getAllBoards(Optional.of(workspaceId))).willReturn(null);

        // When
        WorkspaceViewDto result = underTest.getWorkspaceById(workspaceId);

        // Then
        then(workspaceRepository).should().findById(workspaceId);
        then(boardService).should().getAllBoards(Optional.of(workspaceId));

        WorkspaceViewDto expected = new WorkspaceViewDto(workspaceId, workspaceName, null);
        assertThat(result).isEqualTo(expected);
    }

    @Test
    void itShouldNotGetWorkspaceByIdWhenWorkspaceIsBelongedToAnotherUser() {
        // Given
        String loggedUsername = "loggedUsernameTest";
        String anotherUsername = "anotherUsernameTest";
        Long workspaceId = 1L;
        User user = new User(1L, null, anotherUsername, "test@gmail.com", "testPassword");

        Workspace workspace = Workspace
                .builder()
                .id(workspaceId)
                .name("workspaceName")
                .user(user)
                .build();

        // ... logged username
        SecurityContextHolder.getContext().setAuthentication(authentication);
        given(authentication.getName()).willReturn(loggedUsername);


        //... Workspace exists
        given(workspaceRepository.findById(workspaceId)).willReturn(Optional.ofNullable(workspace));

        // When
        assertThatThrownBy(() -> underTest.getWorkspaceById(workspaceId))
                .isInstanceOf(WorkspaceBelongAnotherUserException.class)
                .hasMessageContaining("Workspace is belonged to another user.");


        // Then
        then(workspaceRepository).should().findById(workspaceId);

        then(boardService).should(never()).getAllBoards(any());
    }

    @Test
    void itShouldDeleteWorkspaceById() {
        // Given a workspace id and a user
        Long workspaceId = 1L;
        String username = "testUsername";
        User user = new User(1L, null, username, "test@gmail.com", "testPassword");

        Workspace workspace = Workspace.builder()
                .id(workspaceId)
                .user(user)
                .build();

        // ... Workspace exists
        given(workspaceRepository.findById(workspaceId)).willReturn(Optional.of(workspace));

        // When
        underTest.deleteWorkspaceById(workspaceId, username);

        // Then
        then(workspaceRepository).should().findById(workspaceId);
        then(workspaceRepository).should().deleteById(workspaceId);
    }

    @Test
    void itShouldNotDeleteWorkspaceByIdWhenWorkspaceIsNotFound() {
        // Given a workspace id and a username
        Long workspaceId = 1L;
        String username = "testUsername";

        // ... Workspace does not exist.
        given(workspaceRepository.findById(workspaceId)).willReturn(Optional.empty());

        // When
        // Then
        assertThatThrownBy(() -> underTest.deleteWorkspaceById(workspaceId, username))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining("Workspace is not found");

        then(workspaceRepository).should(never()).deleteById(workspaceId);
    }

    @Test
    void itShouldNotDeleteWorkspaceByIdWhenWorkspaceIsBelongedToAnotherUser() {
        // Given a workspace id and a user
        Long workspaceId = 1L;
        String username = "testUsername";
        String anotherUsername = "testAnotherUsername";
        User user = new User(1L, null, username, "test@gmail.com", "testPassword");

        Workspace workspace = Workspace.builder()
                .id(workspaceId)
                .user(user)
                .build();

        // ... Workspace exists
        given(workspaceRepository.findById(workspaceId)).willReturn(Optional.of(workspace));

        // When
        assertThatThrownBy(() -> underTest.deleteWorkspaceById(workspaceId, anotherUsername))
                .isInstanceOf(UnAuthorizedException.class)
                .hasMessageContaining("UnAuthorized Exception");

        // Then
        then(workspaceRepository).should().findById(workspaceId);
        then(workspaceRepository).should(never()).deleteById(any());
    }

    @Test
    void itShouldUpdateWorkspace() {
        // Given a workspace id, workspace name and a username
        Long workspaceId = 1L;
        String userName = "userTest";
        Long userId = 1L;
        User user = new User(userId, null, userName, "test@gmail.com", "testPassword");
        String newWorkspaceName = "testNewWorkspaceName";
        Workspace workspace = Workspace
                .builder()
                .id(workspaceId)
                .name("testWorkspaceName")
                .user(user)
                .build();
        // ... Workspace exists
        given(workspaceRepository.findById(workspaceId)).willReturn(Optional.of(workspace));
        // ... New workspace name does not exist.
        given(workspaceRepository.findByName(newWorkspaceName)).willReturn(Optional.empty());

        // When
        underTest.updateWorkspace(workspaceId, userName, newWorkspaceName);

        // Then
        then(workspaceRepository).should().findById(workspaceId);
        then(workspaceRepository).should().findByName(newWorkspaceName);
    }

    @Test
    void itShouldNotUpdateWorkspaceWhenWorkspaceIsNotFound() {
        // Given a workspace id, workspace name and a username
        Long workspaceId = 1L;
        String userName = "userTest";
        String newWorkspaceName = "testNewWorkspaceName";

        // ... Workspace does not exist.
        given(workspaceRepository.findById(workspaceId)).willReturn(Optional.empty());

        // When
        // Then
        assertThatThrownBy(() -> underTest.updateWorkspace(workspaceId, userName, newWorkspaceName))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("workspace is not found");
        then(workspaceRepository).should(never()).findByName(any());
    }

    @Test
    void itShouldNotUpdateWorkspaceWhenWorkspaceNameIsIncorrectFormat() {
        // Given a workspace id, workspace name and a username
        Long workspaceId = 1L;
        String userName = "userTest";
        Long userId = 1L;
        User user = new User(userId, null, userName, "test@gmail.com", "testPassword");
        String newWorkspaceName = "";
        Workspace workspace = Workspace
                .builder()
                .id(workspaceId)
                .name("testWorkspaceName")
                .user(user)
                .build();
        // ... Workspace exists
        given(workspaceRepository.findById(workspaceId)).willReturn(Optional.of(workspace));

        // When
        // Then
        assertThatThrownBy(() -> underTest.updateWorkspace(workspaceId, userName, newWorkspaceName))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("Id or workspace is incorrect format");

        then(workspaceRepository).should().findById(workspaceId);
        then(workspaceRepository).should(never()).findByName(any());
    }

    @Test
    void itShouldNotUpdateWorkspaceWhenWorkspaceNameAlreadyExists() {
        // Given a workspace id, workspace name and a username
        Long workspaceId = 1L;
        String userName = "userTest";
        Long userId = 1L;
        User user = new User(userId, null, userName, "test@gmail.com", "testPassword");
        String newWorkspaceName = "testWorkspaceName";
        Workspace workspace = Workspace
                .builder()
                .id(workspaceId)
                .name("testWorkspaceName")
                .user(user)
                .build();
        // ... Workspace exists
        given(workspaceRepository.findById(workspaceId)).willReturn(Optional.of(workspace));
        // ... New workspace name already exists.
        given(workspaceRepository.findByName(newWorkspaceName)).willReturn(Optional.of(workspace));

        // When
        // Then
        assertThatThrownBy(() -> underTest.updateWorkspace(workspaceId, userName, newWorkspaceName))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("workspace already exists");

        then(workspaceRepository).should().findById(workspaceId);
        then(workspaceRepository).should().findByName(newWorkspaceName);
    }

}