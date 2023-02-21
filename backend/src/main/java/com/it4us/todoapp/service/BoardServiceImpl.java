package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.dto.ListOfBoardViewDto;
import com.it4us.todoapp.entity.Board;
import com.it4us.todoapp.entity.Workspace;
import com.it4us.todoapp.exception.*;
import com.it4us.todoapp.repository.BoardRepository;
import com.it4us.todoapp.utilities.LoggedUsername;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private WorkspaceService workspaceService;
    @Autowired
    private ListOfBoardService listOfBoardService;


    @Override
    public BoardViewDto create(BoardCreateDto boardCreateDto, String username) {

        Board board = new Board();
        Workspace workspace = workspaceService.findWorkspaceById(boardCreateDto.getWorkspaceId());

        if (isBoardExist(boardCreateDto.getName(), boardCreateDto.getWorkspaceId()))
            throw new BoardExistException("Board is already exist");
        if (!isAValidBoardName(boardCreateDto.getName()))
            throw new BadRequestException("Authorization Header, workspace Id or boardName is in incorrect format");
        if (!workspace.getUser().getUsername().equals(username))
            throw new BelongToAnotherUserException("You can't access to Workspace of other User");

        board.setName(boardCreateDto.getName());
        board.setWorkspace(workspace);

        return BoardViewDto.of(boardRepository.save(board), null);
    }

    @Override
    public BoardViewDto getBoardById(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException("Board is not found"));
        if (!isBoardBelongedUser(boardId)) {
            throw new BoardBelongAnotherUserException("The board is belonged another user.");
        }
        List<ListOfBoardViewDto> listViewDtoBoardsList = listOfBoardService.getAllListsInBoards(boardId);
        return BoardViewDto.of(findBoardById(boardId), listViewDtoBoardsList);
    }

    @Override
    public Board findBoardById(Long boardId){

        Board board = boardRepository.findById(boardId).orElseThrow(()  -> new BoardNotFoundException("Board is not found"));

        if (!isBoardBelongedUser(boardId)) {
            throw new BoardBelongAnotherUserException("The board is belonged another user.");
        }
        return board;
    }

    @Override
    public List<BoardViewDto> getAllBoards(Optional<Long> workspaceId) {
        List<Board> boards;
        if (workspaceId.isPresent()) {
            boards = boardRepository.findByWorkspaceId(workspaceId);
        } else {
            boards = boardRepository.findAll();
        }
        return boards.stream()
                .map(board -> BoardViewDto.of(board, listOfBoardService.getAllListsInBoards(board.getId())))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateBoard(Long id, String username, String name) {

        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("board not found"));

        if (id == null || name.length() == 0) {
            throw new IllegalStateException("board id or boardname is in incorrect format");
        }

        Optional<Board> boardOptional = boardRepository.findByName(name);
        if (boardOptional.isPresent()) {
            throw new IllegalStateException("board already exists");
        }
        if (username != null && id != 0 && name != null) {
            board.setId(id);
            board.setName(username);
            board.setName(name);
        }
    }

    @Override
    public void deleteBoard(Long id, String username) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new NotFoundException("board not found"));
        if (boardRepository.isBoardBelongToUser(id, username) == false) {
            throw new BoardBelongAnotherUserException("Board belongs to another user");
        }
        boardRepository.delete(board);
    }

    private boolean isBoardBelongedUser(Long boardId) {
        return (boardRepository.isBoardBelongToUser(boardId, LoggedUsername.getUsernameFromAuthentication()));
    }

    private boolean isBoardExist(String boardName, Long workspaceId) {
        return boardRepository.isBoardExistInWorkSpace(boardName, workspaceId);
    }

    private boolean isAValidBoardName(String boardName) {

        char[] boardNameToChar = boardName.toCharArray();
        int countOf_ = 0;
        for (char c : boardNameToChar) {
            if (c == '_') {
                countOf_++;
                if (countOf_ > 1)
                    return false;
            } else if (!((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || (c == ' '))) {
                return false;
            }
        }
        return  (boardNameToChar.length > 4 && boardNameToChar.length < 15 && boardNameToChar[0] != '_');
    }



}
