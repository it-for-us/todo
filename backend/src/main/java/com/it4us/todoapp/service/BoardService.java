package com.it4us.todoapp.service;


import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.entity.Board;


import java.util.List;


public interface BoardService {

    BoardViewDto createBoard(BoardCreateDto boardCreateDto, String username);
    BoardViewDto updateBoard(BoardCreateDto boardCreateDto, String username);
    void deleteBoard(Long id, String username);
    BoardViewDto getBoardById(Long boardId);
    Board findBoardById(Long boardId);
    List<BoardViewDto> getAllBoardsOfWorkspace(Long workspaceId);



}
