package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.dto.ListOfBoardViewDto;
import com.it4us.todoapp.entity.Board;
import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.entity.Workspace;
import com.it4us.todoapp.exception.*;
import com.it4us.todoapp.repository.BoardRepository;
import com.it4us.todoapp.utilities.LoggedUsername;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BoardServiceImplTest {

    @Mock
    private BoardRepository boardRepository;
    @Mock
    private WorkspaceService workspaceService;
    @Mock
    private ListOfBoardService listOfBoardService;
    @Mock
    Authentication auth ;
    @InjectMocks
    private BoardServiceImpl boardService;

    private static User savedUser;
    private static Workspace savedWorkspace;
    private static Board savedBoard;
    private static BoardCreateDto boardCreateDto;
    private static String loggedUsername;

    @BeforeAll
    static void initSetup(){
        savedUser = new User();
        savedUser.setUsername("ToDoApp");
        savedUser.setEmail("todoapp@test.com");
        savedUser.setUserId(333L);
        savedUser.setPassword("todoAppTestPassword");

        savedWorkspace = new Workspace();
        savedWorkspace.setId(22L);
        savedWorkspace.setName("my test workspace");
        savedWorkspace.setUser(savedUser);

        savedBoard = new Board();
        savedBoard.setId(1L);
        savedBoard.setName("my test board");
        savedBoard.setWorkspace(savedWorkspace);

        boardCreateDto = new BoardCreateDto();
        boardCreateDto.setName("my test board");
        boardCreateDto.setWorkspaceId(22L);

        loggedUsername = "ToDoApp";
    }

    @Nested
    @DisplayName("TestCreate_GivenBoardCreateDtoAndUsername")
    class TestCreate{

        @Test
        @DisplayName("Create Successfully BoardViewDto with BoardCreateDto and Username")
        void shouldReturnSuccessfullyBoardViewDto() {

            //Given
            when(workspaceService.findWorkspaceById(22L)).thenReturn(savedWorkspace);
            when(boardRepository.save(any(Board.class))).thenReturn(savedBoard);

            BoardViewDto expected = BoardViewDto.of(savedBoard,null);

            //when
            BoardViewDto actual = boardService.create(boardCreateDto,loggedUsername);

            //then
            assertEquals(actual.getName(),expected.getName());
            assertEquals(actual.getId(), expected.getId());
            assertEquals(actual.getWorkSpaceId(), expected.getWorkSpaceId());
            assertNull(actual.getLists());
            assertNotNull(actual);

            verify(workspaceService, times(1)).findWorkspaceById(anyLong());
            verify(boardRepository, times(1)).save(any(Board.class));
            verifyNoMoreInteractions(listOfBoardService);
        }

        @Test
        @DisplayName("Throw BadRequestException When BoardName Invalid")
        void whenBoardNameInvalid_shouldThrowBadRequestException(){

            //Given
            boardCreateDto.setName("My_Invalid_Test_Board_Name");

            //when_then
            assertThrows(BadRequestException.class,()-> boardService.create(boardCreateDto,loggedUsername));
            verify(workspaceService, times(1)).findWorkspaceById(anyLong());
            verify(boardRepository, times(1)).isBoardExistInWorkSpace(boardCreateDto.getName(),22L);
            verifyNoMoreInteractions(boardRepository, workspaceService);
            verifyNoInteractions(listOfBoardService);

            //Returning boardCreateDto to its initial state
            boardCreateDto.setName("my test board");
        }

        @Test
        @DisplayName("Throw AlreadyExistException When BoardName Exist")
        void whenBoardNameAlreadyExistInRepository_shouldThrowAlreadyExistException() {

            //Given
            when(boardRepository.isBoardExistInWorkSpace(boardCreateDto.getName(),boardCreateDto.getWorkspaceId()))
                    .thenReturn(true);

            //when_then
            assertThrows(BoardExistException.class, ()-> boardService.create(boardCreateDto,loggedUsername));
            verify(workspaceService, times(1)).findWorkspaceById(22L);
            verify(boardRepository, times(1)).isBoardExistInWorkSpace(boardCreateDto.getName(),22L);
            verifyNoMoreInteractions(listOfBoardService);
        }

        @Test
        @DisplayName("Throw BelongToAnotherUserException When Board Belong To Another User")
        void whenBoardIdBelongToAnotherUser_shouldThrowBelongToAnotherUserException() {

            //Given
            User user = new User();
            user.setUsername("anotherUser");
            savedWorkspace.setUser(user);

            when(workspaceService.findWorkspaceById(boardCreateDto.getWorkspaceId())).thenReturn(savedWorkspace);

            //when_then
            assertThrows(BelongToAnotherUserException.class, ()-> boardService.create(boardCreateDto, loggedUsername));

            verify(workspaceService, times(1)).findWorkspaceById(22L);
            verify(boardRepository, times(1)).isBoardExistInWorkSpace(boardCreateDto.getName(),22L);
            verifyNoMoreInteractions(listOfBoardService);

            //Returning savedWorkspace to its initial state
            savedWorkspace.setUser(savedUser);

        }

    }

    @Nested
    @DisplayName("TestFindBoardById_GivenBoardId")
    class TestFindBoardById{

        @Test
        @DisplayName("Get Board Successfully with Board Id")
        void shouldReturnSuccessfullyBoard() {

            //Given
            SecurityContextHolder.getContext().setAuthentication(auth);
            when(auth.getName()).thenReturn(loggedUsername);
            when(boardRepository.findById(savedBoard.getId())).thenReturn(Optional.of(savedBoard));
            when(boardRepository.isBoardBelongToUser(savedBoard.getId(),LoggedUsername.getUsernameFromAuthentication())).thenReturn(true);

            //when
            Board actual = boardService.findBoardById(savedBoard.getId());

            //then
            assertNotNull(actual);
            assertEquals(savedBoard,actual);

            verify(boardRepository, times(1)).findById(any());
            verify(boardRepository, times(1)).isBoardBelongToUser(any(),any());
            verifyNoMoreInteractions(boardRepository);
            verifyNoInteractions(workspaceService, listOfBoardService);

        }

        @Test
        @DisplayName("Throw BoardNotFoundException When Board Isn't Exist In Repository")
        void whenBoardDoesNotExistInRepository_shouldThrowBoardNotFoundException() {
            //given
            when(boardRepository.findById(savedBoard.getId())).thenReturn(Optional.empty());

            //when_then
            assertThrows(BoardNotFoundException.class, ()->  boardService.findBoardById(savedBoard.getId()));

            verify(boardRepository, times(1)).findById(savedBoard.getId());
            verifyNoMoreInteractions(boardRepository);
            verifyNoInteractions(workspaceService,listOfBoardService);

        }

        @Test
        @DisplayName("Throw BoardBelongToAnotherUserException When Board Belong To Another User")
        void whenBoardBelongToAnotherUser_shouldThrowBoardBelongToAnotherUserException() {
            //Given
            SecurityContextHolder.getContext().setAuthentication(auth);
            when(auth.getName()).thenReturn("myOtherTestUsername");
            when(boardRepository.findById(savedBoard.getId())).thenReturn(Optional.of(savedBoard));
            when(boardRepository.isBoardBelongToUser(any(),anyString())).thenReturn(false);

            //when_then
            assertThrows(BoardBelongAnotherUserException.class, ()->  boardService.findBoardById(savedBoard.getId()));

            verify(boardRepository, times(1)).findById(savedBoard.getId());
            verify(boardRepository, times(1)).isBoardBelongToUser(any(),any());
            verifyNoMoreInteractions(boardRepository);
            verifyNoInteractions(workspaceService,listOfBoardService);
        }
    }

    @Nested
    @DisplayName("TestGetBoardById_GivenBoardId")
    class TestGetBoardById{

        @Test
        @DisplayName("Get BoardViewDto Successfully with Board Id")
        void shouldReturnSuccessfullyBoardViewDto() {

            //Given
            SecurityContextHolder.getContext().setAuthentication(auth);
            when(auth.getName()).thenReturn(loggedUsername);
            when(boardRepository.findById(savedBoard.getId())).thenReturn(Optional.of(savedBoard));
            when(boardRepository.isBoardBelongToUser(savedBoard.getId(),LoggedUsername.getUsernameFromAuthentication())).thenReturn(true);
            when(listOfBoardService.getAllListsInBoards(savedBoard.getId())).thenReturn(new ArrayList<>());

            //when
            BoardViewDto actual = boardService.getBoardById(savedBoard.getId());

            //then
            assertNotNull(actual);
            assertEquals(BoardViewDto.of(savedBoard,new ArrayList<>()),actual);

            verify(boardRepository, times(1)).findById(any());
            verify(boardRepository, times(1)).isBoardBelongToUser(any(),any());
            verify(listOfBoardService, times(1)).getAllListsInBoards(anyLong());
            verifyNoMoreInteractions(boardRepository, listOfBoardService);
            verifyNoInteractions(workspaceService);
        }

    }

    @Nested
    @DisplayName("TestUpdate_GivenBoardIdAndBoardNameAndUsername")
    class TestUpdate{

        @Test
        @DisplayName("Update Successfully Board with Board Id, Board Name, Username")
        void shouldUpdateSuccessfully() {

            //Given
            when(boardRepository.findById(anyLong())).thenReturn(Optional.of(savedBoard));
            when(boardRepository.findByName(any())).thenReturn(Optional.empty());

            // when
            boardService.updateBoard(savedBoard.getId(), loggedUsername, "newBoard");

            // then
            assertEquals("newBoard", savedBoard.getName());
            assertEquals(loggedUsername,savedUser.getUsername());
            assertNotNull(savedBoard);

            verify(boardRepository, times(1)).findById(any());
            verify(boardRepository, times(1)).save(savedBoard);
            verify(boardRepository, times(1)).findByName(any());
            verifyNoMoreInteractions(boardRepository);
            verifyNoInteractions(workspaceService,listOfBoardService);

        }

        @Test
        @DisplayName("Throw IllegalStateException when Board Does Not Exist In Repository")
        void whenBoardDoesNotExistInRepository_shouldThrowIllegalStateException(){}

        @Test
        @DisplayName("Throw IllegalStateException when Board Id Or Board Name Incorrect Format")
        void whenBoardIdOrBoardNameIncorrectFormat_shouldThrowIllegalStateException(){}

        @Test
        @DisplayName("Throw IllegalStateException when New Board Name Already Exist In Repository")
        void whenNewBoardNameAlreadyExistInRepository_shouldThrowIllegalStateException(){}

    }

    @Nested
    @DisplayName("TestDelete_GivenBoardIdAndUsername")
    class TestDelete{

        @Test
        @DisplayName("Delete Board Successfully with Board Id and Username")
        void shouldDeleteSuccessfully() {

            //Given
            when(boardRepository.findById(savedBoard.getId())).thenReturn(Optional.of(savedBoard));
            when(boardRepository.isBoardBelongToUser(savedBoard.getId(),loggedUsername)).thenReturn(true);

            //When
            boardService.deleteBoard(savedBoard.getId(),loggedUsername);

            //Then
            verify(boardRepository,times(1)).delete(savedBoard);
            verify(boardRepository,times(1)).findById(anyLong());
            verify(boardRepository,times(1)).isBoardBelongToUser(any(),any());
            verifyNoMoreInteractions(boardRepository);
            verifyNoInteractions(workspaceService, listOfBoardService);

        }

        @Test
        @DisplayName("Throw NotFoundException When Board Isn't Exist In Repository")
        void whenBoardDoesNotExistInRepository_shouldThrowNotFoundException() {

            //Given
            when(boardRepository.findById(savedBoard.getId())).thenReturn(Optional.empty());

            //when_then
            assertThrows(NotFoundException.class, ()->  boardService.deleteBoard(savedBoard.getId(),loggedUsername));

            verify(boardRepository, times(1)).findById(savedBoard.getId());
            verifyNoMoreInteractions(boardRepository);
            verifyNoInteractions(workspaceService,listOfBoardService);
        }

        @Test
        @DisplayName("Throw BelongToAnotherUserException When Board Belong To Another User")
        void whenBoardBelongToAnotherUser_shouldThrowBoardBelongToAnotherUserException(){

            //Given
            when(boardRepository.findById(savedBoard.getId())).thenReturn(Optional.of(savedBoard));
            when(boardRepository.isBoardBelongToUser(savedBoard.getId(),loggedUsername)).thenReturn(false);

            //when_then
            assertThrows(BoardBelongAnotherUserException.class, ()->  boardService.deleteBoard(savedBoard.getId(),loggedUsername));

            verify(boardRepository, times(1)).findById(savedBoard.getId());
            verify(boardRepository, times(1)).isBoardBelongToUser(any(),any());
            verifyNoMoreInteractions(boardRepository);
            verifyNoInteractions(workspaceService,listOfBoardService);

        }

    }

    @Nested
    @DisplayName("TestGetAllBoards_GivenWorkspaceId")
    class TestGetAllBoards{

        @Test
        @DisplayName("Get List Of BoardViewDto In Workspace Successfully with Workspace Id")
        void shouldReturnSuccessfullyListOfBoardViewDto() {

            //Given
            Board board2 = new Board(2L,"my test board1",savedWorkspace);
            Board board3 = new Board(3L,"my test board2", savedWorkspace);
            Board board4 = new Board(4L, "my test board3", savedWorkspace);

            List<ListOfBoardViewDto> listOfBoardViewDtoListOfBoard2 = new ArrayList<>();
            List<ListOfBoardViewDto> listOfBoardViewDtoListOfBoard3 = new ArrayList<>();
            ListOfBoardViewDto listOfBoard1 = new ListOfBoardViewDto(41L,"my test list of board1",1,board2.getId(),null);
            ListOfBoardViewDto listOfBoard2 = new ListOfBoardViewDto(42L,"my test list of board2",1,board2.getId(), null);
            ListOfBoardViewDto listOfBoard3 = new ListOfBoardViewDto(43L,"my test list of board3",2,board2.getId(), null);
            ListOfBoardViewDto listOfBoard4 = new ListOfBoardViewDto(44L,"my test list of board4",1,board3.getId(), null);
            ListOfBoardViewDto listOfBoard5 = new ListOfBoardViewDto(45L,"my test list of board5",1,board3.getId(),null);
            ListOfBoardViewDto listOfBoard6 = new ListOfBoardViewDto(46L,"my test list of board5",2,board3.getId(),null);
            listOfBoardViewDtoListOfBoard2.add(listOfBoard1);
            listOfBoardViewDtoListOfBoard2.add(listOfBoard2);
            listOfBoardViewDtoListOfBoard2.add(listOfBoard3);
            listOfBoardViewDtoListOfBoard3.add(listOfBoard4);
            listOfBoardViewDtoListOfBoard3.add(listOfBoard5);
            listOfBoardViewDtoListOfBoard3.add(listOfBoard6);

            List<BoardViewDto> expected = new ArrayList<>();
            expected.add(BoardViewDto.of(savedBoard,null));
            expected.add(BoardViewDto.of(board2,listOfBoardViewDtoListOfBoard2));
            expected.add(BoardViewDto.of(board3,listOfBoardViewDtoListOfBoard3));
            expected.add(BoardViewDto.of(board4,null));

            when(boardRepository.findByWorkspaceId(Optional.of(22L))).thenReturn(List.of(savedBoard, board2, board3, board4));
            when(listOfBoardService.getAllListsInBoards(savedBoard.getId())).thenReturn(null);
            when(listOfBoardService.getAllListsInBoards(board2.getId())).thenReturn(listOfBoardViewDtoListOfBoard2);
            when(listOfBoardService.getAllListsInBoards(board3.getId())).thenReturn(listOfBoardViewDtoListOfBoard3);
            when(listOfBoardService.getAllListsInBoards(board4.getId())).thenReturn(null);


            //when
            List<BoardViewDto> actual = boardService.getAllBoards(Optional.of(22L));

            //then
            assertNotNull(actual);
            assertEquals(expected,actual);
            assertNull(actual.get(1).getLists().get(1).getCards());
            assertNotNull(actual.get(1).getLists().get(2));

            verify(boardRepository, times(1)).findByWorkspaceId(Optional.of(22L));
            verify(listOfBoardService, times(4)).getAllListsInBoards(anyLong());
            verifyNoMoreInteractions(workspaceService);
        }
    }
}



