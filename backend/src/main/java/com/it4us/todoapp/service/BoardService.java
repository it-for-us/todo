package com.it4us.todoapp.service;


import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;

import java.util.List;
import java.util.Optional;

public interface BoardService {

    BoardViewDto create (BoardCreateDto boardCreateDto,String username);
    BoardViewDto getBoardById(Long boardId);
    List<BoardViewDto> getAllBoards(Optional<Long> workspaceId);
    Boolean isBoardExist(String boardName, Long workspaceId);
    Boolean isAValidBoardName(BoardCreateDto boardCreateDto);
}
