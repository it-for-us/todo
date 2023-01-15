package com.it4us.todoapp.controller;


import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.service.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Table;

@RestController
@RequestMapping(value = "/boards")
@Table(name = "Boards")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping
    public ResponseEntity<BoardViewDto> createBoard (@RequestBody BoardCreateDto boardCreateDto){
        BoardViewDto boardViewDto = boardService.create(boardCreateDto);
        return new ResponseEntity<BoardViewDto>(boardViewDto, HttpStatus.CREATED);
    }

    @PutMapping(path="{id}")
    public HttpStatus updateWorkspace(Authentication auth, @PathVariable Long id, @RequestParam(required = false) String name) {
        String username = auth.getName();

        boardService.updateBoard(id,username,name);
        return HttpStatus.OK;
    }

}
