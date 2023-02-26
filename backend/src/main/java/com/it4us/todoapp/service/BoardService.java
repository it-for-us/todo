package com.it4us.todoapp.service;


import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.entity.Board;


import javax.transaction.Transactional;

import java.util.List;
import java.util.Optional;


public interface BoardService {

    BoardViewDto create (BoardCreateDto boardCreateDto,String username);
    BoardViewDto getBoardById(Long boardId);
    Board findBoardById(Long boardId);
    List<BoardViewDto> getAllBoards(Optional<Long> workspaceId);
    void deleteBoard(Long id, String username);
    @Transactional
    void updateBoard(Long id, String username, String name);

}
