package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.CardViewDto;
import com.it4us.todoapp.dto.ListOfBoardCreateDto;
import com.it4us.todoapp.dto.ListOfBoardViewDto;
import com.it4us.todoapp.entity.Board;
import com.it4us.todoapp.entity.Card;
import com.it4us.todoapp.entity.ListOfBoard;
import com.it4us.todoapp.exception.AlreadyExistException;
import com.it4us.todoapp.exception.BadRequestException;
import com.it4us.todoapp.exception.BelongToAnotherUserException;
import com.it4us.todoapp.exception.NotFoundException;
import com.it4us.todoapp.repository.ListOfBoardRepository;
import com.it4us.todoapp.utilities.LoggedUsername;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ListOfBoardServiceImpl implements ListOfBoardService {

    private final ListOfBoardRepository listOfBoardRepository;
    private final BoardService boardService;
    //private final CardService cardService;

    @Autowired
    //@Lazy
    public ListOfBoardServiceImpl(ListOfBoardRepository listOfBoardRepository,
                                  BoardService boardService){
        this.listOfBoardRepository = listOfBoardRepository;
        this.boardService = boardService;
    }

    @Override
    public ListOfBoardViewDto create(ListOfBoardCreateDto listOfBoardCreateDto, String username) {

        Board board = boardService.findBoardById(listOfBoardCreateDto.getBoardId());
        if (!isAValidListTitle(listOfBoardCreateDto.getTitle()) || listOfBoardCreateDto.getBoardId()<=0)
            throw new BadRequestException("List title or boardId is in incorrect format");
        if (isListOfBoardExist(listOfBoardCreateDto.getTitle(), listOfBoardCreateDto.getBoardId()))
            throw new AlreadyExistException("List is already exist");
        if (!isBoardBelongToUser(board.getId(),username))
            throw new BelongToAnotherUserException("Board belongs to another user");

        ListOfBoard listOfBoard = new ListOfBoard();
        listOfBoard.setTitle(listOfBoardCreateDto.getTitle());
        listOfBoard.setBoard(board);
        listOfBoard.setOrderNumber(orderNumberCreator(board.getId()));

        return ListOfBoardViewDto.of(listOfBoardRepository.save(listOfBoard),null);
    }

    @Override
    public ListOfBoardViewDto update(ListOfBoardCreateDto listOfBoardCreateDto, String username) {
        ListOfBoard listOfBoard = listOfBoardRepository.findById(listOfBoardCreateDto.getId())
                .orElseThrow(() -> new NotFoundException("List is not found"));

        if (!isBoardBelongToUser(listOfBoardCreateDto.getBoardId(),username))
            throw new BelongToAnotherUserException("You can't access to Board of other User");
        if (!isListBelongedUser(listOfBoardCreateDto.getBoardId(), listOfBoardCreateDto.getId(), username))
            throw new BelongToAnotherUserException("You can't access to List of other User");
        if ((listOfBoardCreateDto.getTitle()!=null && !isAValidListTitle(listOfBoardCreateDto.getTitle())) || listOfBoardCreateDto.getId() <= 0 || listOfBoardCreateDto.getBoardId() <= 0)
            throw new BadRequestException("ListId, description, title, order number or boardId is in incorrect format");

        if (listOfBoardCreateDto.getTitle() != null)             listOfBoard.setTitle(listOfBoardCreateDto.getTitle());
        if (listOfBoardCreateDto.getOrderNumber() != null)       listOfBoard.setOrderNumber(orderNumberUpdater(listOfBoardCreateDto));

        return ListOfBoardViewDto.of(listOfBoardRepository.save(listOfBoard),getAllCardViewDtosInList(listOfBoard.getId()));
    }

    @Override
    public void delete(Long id, String username) {
        ListOfBoard listOfBoard = listOfBoardRepository.findById(id).orElseThrow(() -> new NotFoundException("List not found"));

        if (!isListBelongedUser(listOfBoard.getBoard().getId(),listOfBoard.getId(),username)) {
            throw new BelongToAnotherUserException("List belongs to another user");
        }
        orderNumberUpdaterAfterDelete(listOfBoard);
        listOfBoardRepository.delete(listOfBoard);
    }

    @Override
    public List<ListOfBoardViewDto> getAllListViewDtosOfBoard(Long boardId) {
        List<ListOfBoard> lists = getAllListsInBoard(boardId);
        if (lists.isEmpty())
            return null;

        return lists.stream()
                .map(list -> ListOfBoardViewDto.of(list,getAllCardViewDtosInList(list.getId())))
                .collect(Collectors.toList());
    }

    @Override
    public ListOfBoardViewDto getListOfBoardById(Long listOfBoardId) {

        //return ListOfBoardViewDto.of(findListOfBoardById(listOfBoardId),cardService.getAllCards(listOfBoardId));
        return ListOfBoardViewDto.of(findListOfBoardById(listOfBoardId),getAllCardViewDtosInList(listOfBoardId));

    }

    @Override
    public ListOfBoard findListOfBoardById(Long listOfBoardId) {
        ListOfBoard listOfBoard = listOfBoardRepository.findById(listOfBoardId)
                .orElseThrow(()  -> new NotFoundException("List is not found"));

        if (!isListBelongedUser(listOfBoard.getBoard().getId(), listOfBoard.getId(), LoggedUsername.getUsernameFromAuthentication())) {
            throw new BelongToAnotherUserException("List belongs to another user");
        }
        return listOfBoard;
    }

    private List<ListOfBoard> getAllListsInBoard(Long boardId) {
        if (boardId != null)
            return listOfBoardRepository.findAllListsByBoardId(boardId);

        return null;
    }

    private List<CardViewDto> getAllCardViewDtosInList (Long listOfBoardId){
        List<Card> allCardsInList = getAllCardsInList(listOfBoardId);
        if (allCardsInList.isEmpty())
            return null;

        return allCardsInList.stream()
                .map(card -> CardViewDto.of(card))
                .collect(Collectors.toList());
    }

    private List<Card> getAllCardsInList (Long listOfBoardId){

        if (listOfBoardId != null)
           return listOfBoardRepository.getAllCardsByListId(listOfBoardId);

        return null;
    }


    private boolean isListOfBoardExist(String title, Long boardId) {
        return listOfBoardRepository.isListExistInBoard(title,boardId);
    }

    private boolean isAValidListTitle(String title) {
        char[] listNameToChar = title.toCharArray();
        int countOf_ = 0;
        for (char c : listNameToChar) {
            if (c == '_') {
                countOf_++;
                if (countOf_ > 1)
                    return false;
            } else if (!((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || (c == ' '))) {
                return false;
            }
        }
        return  (listNameToChar.length > 4 && listNameToChar.length < 15 && listNameToChar[0] != '_');
    }


    private boolean isBoardBelongToUser(Long boardId, String username){
        return (listOfBoardRepository.isBoardBelongedUser(boardId, username));
    }

    private boolean isListBelongedUser(Long boardId, Long listId, String username) {
        if (isBoardBelongToUser(boardId, username)){
            List<ListOfBoard> listsInBoard = getAllListsInBoard(boardId);

            for (ListOfBoard listOfBoard : listsInBoard){
                if (listOfBoard.getId()==listId){
                    return true;
                }
            }
        }
        return false;
    }


    private Integer orderNumberCreator(Long boardId){
        if (getAllListsInBoard(boardId).isEmpty()){
            return 1;
        }else
            return (getAllListsInBoard(boardId).size()+1);
    }

    private Integer orderNumberUpdater(ListOfBoardCreateDto listOfBoardCreateDto){
        List<ListOfBoard> listsOfBoardList = listOfBoardRepository.findAllListsByBoardId(listOfBoardCreateDto.getBoardId());
        Optional<ListOfBoard> currentList = listOfBoardRepository.findById(listOfBoardCreateDto.getId());
        Integer newOrder = listOfBoardCreateDto.getOrderNumber();
        Integer currentListOrder = currentList.get().getOrderNumber();

        if (newOrder > 0 && newOrder <= listsOfBoardList.size()){
            if (newOrder < currentListOrder) {
                ListsToUpdateInRange(1, listOfBoardCreateDto);
            } else {
                ListsToUpdateInRange(-1, listOfBoardCreateDto);
            }
        } else throw new BadRequestException("ListId, title, order number or boardId is in incorrect format");
        return newOrder;
    }

    private void orderNumberUpdaterAfterDelete(ListOfBoard listOfBoard){
        Long boardId = listOfBoard.getBoard().getId();
        Integer minOrder = listOfBoard.getOrderNumber();
        Integer maxOrder = getAllListsInBoard(boardId).size();
        List<ListOfBoard> listOfBoardsInRange = listOfBoardRepository.findListsInRange(boardId, minOrder, maxOrder);

        for (ListOfBoard listOfBoardToSet : listOfBoardsInRange) {
            Integer listOfBoardOrder = listOfBoardToSet.getOrderNumber();
            if (listOfBoardOrder== listOfBoard.getOrderNumber())
                continue;

            listOfBoardToSet.setOrderNumber(listOfBoardOrder-1);
            listOfBoardRepository.save(listOfBoardToSet);
        }
    }

    private void ListsToUpdateInRange(Integer beforeOrAfter, ListOfBoardCreateDto listOfBoardCreateDto){
        Optional<ListOfBoard> currentList = listOfBoardRepository.findById(listOfBoardCreateDto.getId());
        Integer newOrder = listOfBoardCreateDto.getOrderNumber();
        Integer currentListOrder = currentList.get().getOrderNumber();
        Integer minOrder = Math.min(newOrder,currentListOrder);
        Integer maxOrder = Math.max(newOrder, currentListOrder);
        List<ListOfBoard> listsInRange = listOfBoardRepository.findListsInRange(listOfBoardCreateDto.getBoardId(), minOrder, maxOrder);

        for (ListOfBoard listOfBoard : listsInRange) {
            Integer listOfBoardOrder = listOfBoard.getOrderNumber();
            if (listOfBoardOrder!= currentListOrder){
                listOfBoard.setOrderNumber(listOfBoardOrder+beforeOrAfter);
                listOfBoardRepository.save(listOfBoard);
            }
        }
    }

}

