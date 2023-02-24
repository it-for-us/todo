package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.ListOfBoardCreateDto;
import com.it4us.todoapp.dto.ListOfBoardViewDto;
import com.it4us.todoapp.entity.ListOfBoard;

import java.util.List;

public interface ListOfBoardService {

    ListOfBoardViewDto create(ListOfBoardCreateDto listOfBoardCreateDto, String username);

    List<ListOfBoardViewDto> getAllListsInBoards(Long boardId);

    List<ListOfBoard> findAllListsInBoards(Long boardId);
}
