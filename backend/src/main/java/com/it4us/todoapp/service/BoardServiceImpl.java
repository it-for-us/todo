package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.entity.Board;
import com.it4us.todoapp.entity.Workspace;
import com.it4us.todoapp.exception.BadRequestException;
import com.it4us.todoapp.exception.BoardExistException;
import com.it4us.todoapp.exception.NotFoundException;
import com.it4us.todoapp.repository.BoardRepository;
import com.it4us.todoapp.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private WorkspaceRepository workspaceRepository;



    @Override
    public BoardViewDto create(BoardCreateDto boardCreateDto) {

        int count_ = 0;
        for (char c : boardCreateDto.getName().toCharArray()){
            if (c=='_'){
                count_++;
            }
        }

        if(boardCreateDto.getName().charAt(0)=='_'
                || count_>1
                || (!(boardCreateDto.getWorkspaceId()>0 && boardCreateDto.getWorkspaceId()<=Long.MAX_VALUE)))
        {
            throw new BadRequestException("Authorization Header, workspace Id or boardname is in incorrect format");
        } else if (isBoardExist(boardCreateDto.getName(), boardCreateDto.getWorkspaceId())) {
            throw new BoardExistException("Board is already exist");
        }

        Board board = new Board();
        board.setName(boardCreateDto.getName());

        Optional<Workspace> workspace = workspaceRepository.findById(boardCreateDto.getWorkspaceId());
        if (workspace.isPresent()){
            board.setWorkspace(workspace.get());
        } else {
            throw new NotFoundException("There is no such workspace");
        }
        return BoardViewDto.of(boardRepository.save(board));

    }


    @Override
    public Boolean isBoardExist(String boardName, Long workspaceId) {

        Optional<Workspace> workspace = workspaceRepository.findById(workspaceId);

        if (workspace.isPresent()) {
            List<Board> boardList = workspace.get().getBoards();

            for (Board boards : boardList) {
                if (boards.getName().equals(boardName)) {
                    return true;
                }
            }
        }
        return false;
    }
}
