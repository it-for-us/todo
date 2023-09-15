package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.dto.CardViewDto;
import com.it4us.todoapp.dto.ListOfBoardViewDto;
import com.it4us.todoapp.entity.Board;
import com.it4us.todoapp.entity.Card;
import com.it4us.todoapp.entity.ListOfBoard;
import com.it4us.todoapp.entity.Workspace;
import com.it4us.todoapp.exception.*;
import com.it4us.todoapp.repository.BoardRepository;
import com.it4us.todoapp.utilities.LoggedUsername;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final WorkspaceService workspaceService;
    //private final ListOfBoardService listOfBoardService;

    @Autowired
    //@Lazy
    public BoardServiceImpl(//ListOfBoardService listOfBoardService,
                            BoardRepository boardRepository,
                            WorkspaceService workspaceService ){
        //this.listOfBoardService = listOfBoardService;
        this.boardRepository = boardRepository;
        this.workspaceService = workspaceService;
    }

    @Override
    public BoardViewDto createBoard(BoardCreateDto boardCreateDto, String username) {

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
    public BoardViewDto updateBoard(BoardCreateDto boardCreateDto, String username) {

        Board board = boardRepository.findById(boardCreateDto.getId())
                .orElseThrow(() -> new NotFoundException("Board is not found"));

        if (!isBoardBelongedUser(board.getId())){
            throw new BelongToAnotherUserException("You can't access to Board of other User");
        }
        if (boardCreateDto.getId() == null
                || boardCreateDto.getName().isEmpty()
                || !isAValidBoardName(boardCreateDto.getName())) {
            throw new BadRequestException("Board id or Board name is in incorrect format");
        }
        Optional<Board> boardOptional = boardRepository.findByName(boardCreateDto.getName());
        if (boardOptional.isPresent()) {
            throw new AlreadyExistException("Board is already exists");
        }
        if (username != null && boardCreateDto.getId() != 0 && boardCreateDto.getName() != null) {
            board.setName(boardCreateDto.getName());
        }
        return BoardViewDto.of(boardRepository.save(board),getAllListOfBoardViewDtosInBoard(board.getId()));
    }

    @Override
    public void deleteBoard(Long id, String username) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new NotFoundException("Board is not found"));
        if (!isBoardBelongedUser(id)) {
            throw new BelongToAnotherUserException("Board belongs to another user");
        }
        boardRepository.delete(board);
    }

    @Override
    public BoardViewDto getBoardById(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException("Board is not found"));
        if (!isBoardBelongedUser(boardId)) {
            throw new BelongToAnotherUserException("Board is belonged another user.");
        }
        List<ListOfBoardViewDto> listOfBoardViewDtoList = getAllListOfBoardViewDtosInBoard(boardId);
        return BoardViewDto.of(findBoardById(boardId), listOfBoardViewDtoList);
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
    public List<BoardViewDto> getAllBoardsOfWorkspace(Long workspaceId) {
        List<Board> boards;
        if (workspaceId != null) {
            boards = boardRepository.findByWorkspaceId(Optional.of(workspaceId));
        } else return null;

        return boards.stream()
                .map(board -> BoardViewDto.of(board, getAllListOfBoardViewDtosInBoard(board.getId())))
                .collect(Collectors.toList());
    }

    private List<ListOfBoardViewDto> getAllListOfBoardViewDtosInBoard (Long boardId){
        List<ListOfBoard> allListOfBoardsInBoard;
        if (boardId != null) {
            allListOfBoardsInBoard = boardRepository.getAllListsByBoardId(boardId);
        } else return null;

        return allListOfBoardsInBoard.stream()
                .map(listOfBoard -> ListOfBoardViewDto.of(listOfBoard,getAllCardViewDtosInList(listOfBoard.getId())))
                .collect(Collectors.toList());
    }

    private List<CardViewDto> getAllCardViewDtosInList (Long listOfBoardId){
        List<Card> allCardsInList;
        if (listOfBoardId != null) {
            allCardsInList = boardRepository.getAllCardsByListId(listOfBoardId);
        } else return null;

        return allCardsInList.stream()
                .map(card -> CardViewDto.of(card))
                .collect(Collectors.toList());
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
