package com.it4us.todoapp.controller;


import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.service.BoardService;
import com.it4us.todoapp.utilities.LoggedUsername;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Table;

@RestController
@RequestMapping(value = "/api/boards")
@Table(name = "Boards")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping
    public ResponseEntity<BoardViewDto> createBoard (@RequestBody BoardCreateDto boardCreateDto){
        BoardViewDto boardViewDto = boardService.create(boardCreateDto,
                LoggedUsername.getUsernameFromAuthentication());
        return new ResponseEntity<BoardViewDto>(boardViewDto, HttpStatus.CREATED);
    }
    
    @GetMapping({"/{boardId}"})
    public ResponseEntity<BoardViewDto> getBoardById(@PathVariable("boardId") Long boardId){
        BoardViewDto boardViewDto = boardService.getBoardById(boardId);
        return new ResponseEntity<BoardViewDto>(boardViewDto, HttpStatus.OK);
    }


    //board update
    @PutMapping(path="{id}")
    public HttpStatus updateWorkspace(@PathVariable Long id, @RequestParam(required = false) String name) {
        String username = LoggedUsername.getUsernameFromAuthentication();

        boardService.updateBoard(id,username,name);
        return HttpStatus.OK;
    }


}
