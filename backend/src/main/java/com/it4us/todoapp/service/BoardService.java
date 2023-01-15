package com.it4us.todoapp.service;


import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;

import javax.transaction.Transactional;

public interface BoardService {

    BoardViewDto create (BoardCreateDto boardCreateDto);
    Boolean isBoardExist(String boardName, Long workspaceId);
    Boolean isAValidBoardName(BoardCreateDto boardCreateDto);
    Boolean isAValidWorkspaceId(BoardCreateDto boardCreateDto);


    @Transactional
    void updateBoard(Long id, String username, String name);
}
