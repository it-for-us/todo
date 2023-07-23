package com.it4us.todoapp.controller;

import com.it4us.todoapp.dto.ListOfBoardCreateDto;
import com.it4us.todoapp.dto.ListOfBoardViewDto;

import com.it4us.todoapp.service.ListOfBoardService;
import com.it4us.todoapp.utilities.LoggedUsername;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/lists")
public class ListOfBoardController {

    private final ListOfBoardService listOfBoardService;

    @Autowired
    public ListOfBoardController(ListOfBoardService listOfBoardService) {
        this.listOfBoardService = listOfBoardService;
    }

    @PostMapping
    public ResponseEntity<ListOfBoardViewDto> createList(@RequestBody ListOfBoardCreateDto listOfBoardCreateDto) {
        ListOfBoardViewDto listOfBoardViewDto = listOfBoardService.create(listOfBoardCreateDto, LoggedUsername.getUsernameFromAuthentication());
        return new ResponseEntity<>(listOfBoardViewDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteList(@PathVariable Long id) {

        listOfBoardService.deleteList(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
