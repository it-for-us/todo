package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.CardCreateDto;
import com.it4us.todoapp.dto.CardViewDto;
import com.it4us.todoapp.entity.Card;

import java.util.List;

public interface CardService {

    CardViewDto create(CardCreateDto cardCreateDto, String username);
    CardViewDto update(CardCreateDto cardCreateDto, String username);
    void delete(Long id, String username);
    CardViewDto getCardById(Long cardId);
    Card findCardById(Long cardId);
    List<CardViewDto> getAllCardsOfList(Long listId);

}
