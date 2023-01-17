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

        Board board = new Board();

         if (isBoardExist(boardCreateDto.getName(), boardCreateDto.getWorkspaceId()))
            throw new BoardExistException("Board is already exist");

         else if(isAValidWorkspaceId(boardCreateDto) && isAValidBoardName(boardCreateDto)){

             board.setName(boardCreateDto.getName());
             board.setWorkspace((workspaceRepository.findById(boardCreateDto.getWorkspaceId())).get());
         }

        return BoardViewDto.of(boardRepository.save(board));
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
                if (c=='_'){
                    countOf_++;
                }
            }else
                throw new BadRequestException("Authorization Header, workspace Id or boardname is in incorrect format");
        }

        if (boardNameToChar.length<4 || boardNameToChar.length>15 || boardNameToChar[0]=='_'|| countOf_>1)
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
}
