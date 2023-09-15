package com.it4us.todoapp.controller;


import com.it4us.todoapp.dto.BoardCreateDto;
import com.it4us.todoapp.dto.BoardViewDto;
import com.it4us.todoapp.service.BoardService;
import com.it4us.todoapp.utilities.LoggedUsername;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/boards")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping
    public ResponseEntity<BoardViewDto> createBoard(@RequestBody BoardCreateDto boardCreateDto) {
        BoardViewDto boardViewDto = boardService.createBoard(
                boardCreateDto,
                LoggedUsername.getUsernameFromAuthentication()
        );
        return new ResponseEntity<>(boardViewDto, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<BoardViewDto> updateBoard(@RequestBody BoardCreateDto boardCreateDto) {
        BoardViewDto boardViewDto = boardService.updateBoard(
                boardCreateDto,
                LoggedUsername.getUsernameFromAuthentication()
        );
        return new ResponseEntity<>(boardViewDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id, LoggedUsername.getUsernameFromAuthentication());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<BoardViewDto> getBoardById(@PathVariable("id") Long id) {
        BoardViewDto boardViewDto = boardService.getBoardById(id);
        return new ResponseEntity<>(boardViewDto, HttpStatus.OK);
    }

    @GetMapping({"/{workspaceId}"})
    public ResponseEntity<List<BoardViewDto>> getAllLBoard(@PathVariable("workspaceId")Long workspaceId) {
        List<BoardViewDto> BoardViewDtoList = boardService.getAllBoardsOfWorkspace(workspaceId);
        return new ResponseEntity<>(BoardViewDtoList, HttpStatus.OK);
    }
}
