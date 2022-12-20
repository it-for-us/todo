package com.it4us.todoapp.service;


import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;

public interface BoardService {

    BoardViewDto create (BoardCreateDto boardCreateDto);
    Boolean isBoardExist(String boardName, Long workspaceId);
    void deleteBoard(Long id);




}
