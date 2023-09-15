package com.it4us.todoapp.controller;

import com.it4us.todoapp.dto.CardCreateDto;
import com.it4us.todoapp.dto.CardViewDto;
import com.it4us.todoapp.service.CardService;
import com.it4us.todoapp.utilities.LoggedUsername;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/card")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public ResponseEntity<CardViewDto> createCard(@RequestBody CardCreateDto cardCreateDto) {
        CardViewDto cardViewDto = cardService.create(
                cardCreateDto,
                LoggedUsername.getUsernameFromAuthentication()
        );
        return new ResponseEntity<>(cardViewDto, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<CardViewDto> updateCard(@RequestBody CardCreateDto cardCreateDto) {
        CardViewDto cardViewDto = cardService.update(
                cardCreateDto,
                LoggedUsername.getUsernameFromAuthentication());
        return new ResponseEntity<>(cardViewDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCard(@PathVariable Long id) {
        cardService.delete(id, LoggedUsername.getUsernameFromAuthentication());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<CardViewDto> getCardById(@PathVariable("id") Long id) {
        CardViewDto cardViewDto = cardService.getCardById(id);
        return new ResponseEntity<>(cardViewDto, HttpStatus.OK);
    }

    @GetMapping({"/{listId}"})
    public ResponseEntity<List<CardViewDto>> getAllCardsOfList(@PathVariable("listId")Long listId) {
        List<CardViewDto> cardViewDtoList = cardService.getAllCardsOfList(listId);
        return new ResponseEntity<>(cardViewDtoList, HttpStatus.OK);
    }

}
