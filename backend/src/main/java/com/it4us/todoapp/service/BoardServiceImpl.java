package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.entity.Board;
import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.entity.Workspace;
import com.it4us.todoapp.exception.*;
import com.it4us.todoapp.repository.BoardRepository;
import com.it4us.todoapp.repository.UserRepository;
import com.it4us.todoapp.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private WorkspaceRepository workspaceRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public BoardViewDto create(BoardCreateDto boardCreateDto, String username) {

        Board board = new Board();

        Workspace workspace = workspaceRepository.findById(boardCreateDto.getWorkspaceId())
                .orElseThrow(() -> new NotFoundException("Workspace is not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User is not found"));


        if (isBoardExist(boardCreateDto.getName(), boardCreateDto.getWorkspaceId()))
            throw new BoardExistException("Board is already exist");
        else if (isAValidBoardName(boardCreateDto)
                && workspace.getUser().getUsername().equals(user.getUsername())) {

            board.setName(boardCreateDto.getName());
            board.setWorkspace(workspace);
        }

        return BoardViewDto.of(boardRepository.save(board));
    }

    @Override
    public BoardViewDto getBoardById(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new BoardNotFoundException("Board is not found"));
        if (isBoardBelongedUser(boardId))
            return BoardViewDto.of(board);
        else throw new BoardBelongAnotherUserException("The board is belonged another user.");
    }

    private boolean isBoardBelongedUser(Long boardId) {
        return (boardRepository.isBoardBelongedUser(boardId, getUserName()) > 0);
    }

    private String getUserName() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @Override
    public List<BoardViewDto> getAllBoards(Optional<Long> workspaceId) {
        List<Board> boards;
        if (workspaceId.isPresent()) {
            boards = boardRepository.findByWorkspaceId(workspaceId);
        } else boards = boardRepository.findAll();
        return boards.stream().map(board -> BoardViewDto.of(board)).collect(Collectors.toList());
    }

    @Override
    public Boolean isBoardExist(String boardName, Long workspaceId) {
        return boardRepository.isBoardExistInWorkSpace(boardName, workspaceId);
    }

    @Override
    public Boolean isAValidBoardName(BoardCreateDto boardCreateDto) {


        char[] boardNameToChar = boardCreateDto.getName().toCharArray();
        int countOf_ = 0;

        for (char c : boardNameToChar) {
            if ((c >= 'a' && c <= 'z')
                    || (c >= '0' && c <= '9')
                    || (c == ' ')
                    || (c == '_')) {
                if (c == '_') {
                    countOf_++;
                }
            } else
                throw new BadRequestException("Authorization Header, workspace Id or boardname is in incorrect format");
        }

        if (boardNameToChar.length < 4 || boardNameToChar.length > 15 || boardNameToChar[0] == '_' || countOf_ > 1)
            throw new BadRequestException("Authorization Header, workspace Id or boardname is in incorrect format");

        return true;
    }


    @Override
    public Boolean isAValidWorkspaceId(BoardCreateDto boardCreateDto) {

        Optional<Workspace> workspace = workspaceRepository.findById(boardCreateDto.getWorkspaceId());

        if (workspace.isEmpty())
            throw new NotFoundException("There is no such workspace");

        return true;
    }

    @Override
    @Transactional
    public void updateBoard(Long id, String username, String name) {

        Board board=boardRepository.findById(id)
                       .orElseThrow(() -> new IllegalStateException("board not found"));

        if(id==null|| name.length()==0){
            throw new IllegalStateException("board id or boardname is in incorrect format");
        }

        Optional<Board> boardOptional=boardRepository.findByName(name);
        if(boardOptional.isPresent()){
            throw new IllegalStateException("board already exists");
        }
        if (username!=null&& id!=0 && name!=null){
            board.setId(id);
            board.setName(username);
            board.setName(name);
        }
    }

    @Override
    public void deleteBoard(Long id, String username) {
        Board board=boardRepository.findById(id).orElseThrow(()->new NotFoundException("board not found"));
        if(boardRepository.isBoardBelongToUser(id,username)== false){
            throw new BoardBelongAnotherUserException("Board belongs to another user");
        }
        boardRepository.delete(board);
    }

}
