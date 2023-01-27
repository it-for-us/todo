package com.it4us.todoapp.service;


import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;


import javax.transaction.Transactional;

import java.util.List;
import java.util.Optional;


public interface BoardService {

    BoardViewDto create (BoardCreateDto boardCreateDto,String username);
    BoardViewDto getBoardById(Long boardId);
    List<BoardViewDto> getAllBoards(Optional<Long> workspaceId);
    Boolean isBoardExist(String boardName, Long workspaceId);
    void deleteBoard(Long id);
    Boolean isAValidBoardName(BoardCreateDto boardCreateDto);

    Boolean isAValidWorkspaceId(BoardCreateDto boardCreateDto);

    @Transactional
    void updateBoard(Long id, String username, String name);

}
