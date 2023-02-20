package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.ListOfBoardCreateDto;
import com.it4us.todoapp.dto.ListOfBoardViewDto;
import com.it4us.todoapp.entity.Board;
import com.it4us.todoapp.entity.ListOfBoard;
import com.it4us.todoapp.exception.AlreadyExistException;
import com.it4us.todoapp.exception.BadRequestException;
import com.it4us.todoapp.exception.BelongToAnotherUserException;
import com.it4us.todoapp.repository.ListOfBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListOfBoardServiceImpl implements ListOfBoardService {


    private final ListOfBoardRepository listOfBoardRepository;
    private final BoardService boardService;

    @Autowired
    public ListOfBoardServiceImpl(ListOfBoardRepository listOfBoardRepository, BoardService boardService){
        this.listOfBoardRepository = listOfBoardRepository;
        this.boardService = boardService;
    }


    @Override
    public ListOfBoardViewDto create(ListOfBoardCreateDto listOfBoardCreateDto, String username) {

        Board board = boardService.findBoardById(listOfBoardCreateDto.getBoardId());
        if (!isAValidListTitle(listOfBoardCreateDto.getTitle()))
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
    public List<ListOfBoardViewDto> getAllListsInBoards(Long boardId) {
        return null;
    }

    @Override
    public List<ListOfBoard> findAllListsInBoards(Long boardId){
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
        return (listOfBoardRepository.isBoardBelongedUser(boardId, username) > 0);
    }

    private Integer orderNumberCreator(Long boardId){
        if (getAllListsInBoards(boardId)==null){
            return 1;
        }else
            return (getAllListsInBoards(boardId).size()+1);
    }

}

