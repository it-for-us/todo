package com.it4us.todoapp.controller;


import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.service.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Table;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/boards")
@Table(name = "Boards")
public class BoardController {

    private BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }


    @PostMapping
    public ResponseEntity<BoardViewDto> createBoard (@Valid @RequestBody BoardCreateDto boardCreateDto){
        BoardViewDto boardViewDto = boardService.create(boardCreateDto);
        return new ResponseEntity<BoardViewDto>(boardViewDto, HttpStatus.CREATED);
    }
}
