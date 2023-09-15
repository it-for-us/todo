package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.CardCreateDto;
import com.it4us.todoapp.dto.CardViewDto;
import com.it4us.todoapp.entity.Card;
import com.it4us.todoapp.entity.ListOfBoard;
import com.it4us.todoapp.exception.*;
import com.it4us.todoapp.repository.CardRepository;
import com.it4us.todoapp.utilities.LoggedUsername;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CardServiceImpl implements CardService{

    private final CardRepository cardRepository;
    private final ListOfBoardService listOfBoardService;

    @Autowired
    public CardServiceImpl (CardRepository cardRepository,ListOfBoardService listOfBoardService ){
        this.cardRepository = cardRepository;
        this.listOfBoardService = listOfBoardService;
    }

    @Override
    public CardViewDto create(CardCreateDto cardCreateDto, String username) {

        Card card = new Card();
        ListOfBoard listOfBoard = listOfBoardService.findListOfBoardById(cardCreateDto.getListId());

        if (isCardExist(cardCreateDto.getTitle(), cardCreateDto.getListId()))
            throw new AlreadyExistException("Card is already exist");
        if (!isAValidCardTitle(cardCreateDto.getTitle()) || cardCreateDto.getListId()<=0 )
            throw new BadRequestException("Card title, description or listId is in incorrect format");
        if (!isListBelongedUser(cardCreateDto.getListId(),username))
            throw new BelongToAnotherUserException("You can't access to List of other User");

        card.setTitle(cardCreateDto.getTitle());
        card.setDescription(cardCreateDto.getDescription());
        card.setListOfBoard(listOfBoard);
        card.setOrderNumber(orderNumberCreator(listOfBoard.getId()));

        return CardViewDto.of(cardRepository.save(card));
    }

    @Override
    public CardViewDto update(CardCreateDto cardCreateDto, String username) {
        Card card = cardRepository.findById(cardCreateDto.getId())
                .orElseThrow(() -> new NotFoundException("Card is not found"));

        if (!isListBelongedUser(cardCreateDto.getListId(),username))
            throw new BelongToAnotherUserException("You can't access to List of other User");
        if (!isCardBelongedUser(cardCreateDto.getListId(), cardCreateDto.getId(), username))
            throw new BelongToAnotherUserException("You can't access to Card of other User");
        if ((cardCreateDto.getTitle()!=null && !isAValidCardTitle(cardCreateDto.getTitle())) || cardCreateDto.getId() <= 0 || cardCreateDto.getListId() <= 0)
            throw new BadRequestException("Card id, description, title, order number or listId is in incorrect format");

        if (cardCreateDto.getTitle() != null)             card.setTitle(cardCreateDto.getTitle());
        if (cardCreateDto.getDescription() != null)       card.setDescription(cardCreateDto.getDescription());
        if (cardCreateDto.getOrderNumber() != null)       card.setOrderNumber(orderNumberUpdater(cardCreateDto));

        return CardViewDto.of(cardRepository.save(card));
    }

    @Override
    public void delete(Long id, String username) {
        Card card = cardRepository.findById(id).orElseThrow(() -> new NotFoundException("Card not found"));

        if (!isCardBelongedUser(card.getListOfBoard().getId(),card.getId(),username)) {
            throw new BelongToAnotherUserException("Card belongs to another user");
        }
        orderNumberUpdaterAfterDelete(card);
        cardRepository.delete(card);
    }

    @Override
    public CardViewDto getCardById(Long cardId) {

        return CardViewDto.of(findCardById(cardId));
    }

    @Override
    public Card findCardById(Long cardId) {
        Card card = cardRepository.findById(cardId).orElseThrow(()  -> new NotFoundException("Card is not found"));

        if (!isCardBelongedUser(card.getListOfBoard().getId(), card.getId(), LoggedUsername.getUsernameFromAuthentication())) {
            throw new BelongToAnotherUserException("Card belongs to another user");
        }
        return card;
    }

    @Override
    public List<CardViewDto> getAllCardsOfList(Long listId) {
        List<Card> cards = getAllCards(listId);

        if (cards.isEmpty())
             return null;

        return cards.stream()
                .map(card -> CardViewDto.of(card))
                .collect(Collectors.toList());
    }

    public List<Card> getAllCards(Long listId) {

        if (listId != null)
            return cardRepository.findAllCardsByListId(listId);

        return null;
    }


    private boolean isCardExist(String cardTitle, Long listId){
        return cardRepository.isCardExistInList(cardTitle, listId);
    }

    private boolean isAValidCardTitle(String cardTitle){
        char[] cardTitleToChar = cardTitle.toCharArray();
        int countOf_ = 0;
        for (char c : cardTitleToChar) {
            if (c == '_') {
                countOf_++;
                if (countOf_ > 1)
                    return false;
            } else if (!((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || (c == ' '))) {
                return false;
            }
        }
        return  (cardTitleToChar.length > 4 && cardTitleToChar.length < 15 && cardTitleToChar[0] != '_');
    }


    private boolean isListBelongedUser(Long listId, String username){

        return cardRepository.isListBelongToUser(listId, username);
    }

    private boolean isCardBelongedUser(Long listId, Long cardId, String username) {
        if (isListBelongedUser(listId, username)){
            List<Card> cardsInList = getAllCards(listId);

            for (Card card : cardsInList){
                if (card.getId()==cardId){
                    return true;
                }
            }
        }
        return false;
    }


    private Integer orderNumberCreator(Long listId){
        if (getAllCards(listId).isEmpty()){
            return 1;
        }else
            return (getAllCards(listId).size()+1);
    }

    private Integer orderNumberUpdater(CardCreateDto cardCreateDto){
        List<Card> cardList = cardRepository.findAllCardsByListId(cardCreateDto.getListId());
        Optional<Card> currentCard = cardRepository.findById(cardCreateDto.getId());
        Integer newOrder = cardCreateDto.getOrderNumber();
        Integer currentCardOrder = currentCard.get().getOrderNumber();

        if (newOrder > 0 && newOrder <= cardList.size()){
            if (newOrder < currentCardOrder) {
                CardsToUpdateInRange(1, cardCreateDto);
            } else {
                CardsToUpdateInRange(-1, cardCreateDto);
            }
        } else throw new BadRequestException("Card id, description, title, order number or list Id is in incorrect format");
        return newOrder;
    }

    private void orderNumberUpdaterAfterDelete(Card card){
        Long listId = card.getListOfBoard().getId();
        Integer minOrder = card.getOrderNumber();
        Integer maxOrder = getAllCards(listId).size();
        List<Card> cardsInRange = cardRepository.findCardsInRange(listId, minOrder, maxOrder);

        for (Card cardToSet : cardsInRange) {
            Integer cardOrder = cardToSet.getOrderNumber();
            if (cardOrder== card.getOrderNumber())
                continue;

            cardToSet.setOrderNumber(cardOrder-1);
            cardRepository.save(cardToSet);
        }

    }

    private void CardsToUpdateInRange(Integer beforeOrAfter, CardCreateDto cardCreateDto){
        Optional<Card> currentCard = cardRepository.findById(cardCreateDto.getId());
        Integer newOrder = cardCreateDto.getOrderNumber();
        Integer currentCardOrder = currentCard.get().getOrderNumber();
        Integer minOrder = Math.min(newOrder,currentCardOrder);
        Integer maxOrder = Math.max(newOrder, currentCardOrder);
        List<Card> cardsInRange = cardRepository.findCardsInRange(cardCreateDto.getListId(), minOrder, maxOrder);

        for (Card card : cardsInRange) {
            Integer cardOrder = card.getOrderNumber();
            if (cardOrder!= currentCardOrder){
                card.setOrderNumber(cardOrder+beforeOrAfter);
                cardRepository.save(card);
            }
        }
    }
}