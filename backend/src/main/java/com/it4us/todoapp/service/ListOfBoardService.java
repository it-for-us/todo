package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.ListOfBoardCreateDto;
import com.it4us.todoapp.dto.ListOfBoardViewDto;
import com.it4us.todoapp.entity.ListOfBoard;

import java.util.List;

public interface ListOfBoardService {

    ListOfBoardViewDto create(ListOfBoardCreateDto listOfBoardCreateDto, String username);
    ListOfBoardViewDto update(ListOfBoardCreateDto listOfBoardCreateDto, String username);
    void delete(Long id, String username);
    ListOfBoardViewDto getListOfBoardById(Long listOfBoardId);
    ListOfBoard findListOfBoardById(Long listOfBoardId);
    List<ListOfBoardViewDto> getAllListViewDtosOfBoard(Long boardId);
}
