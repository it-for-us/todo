package com.it4us.todoapp.dto;


import com.it4us.todoapp.entity.ListOfBoard;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListOfBoardViewDto {

    private Long id;
    private String title;
    private Integer orderNumber;
    private Long boardId;
    private List<CardViewDto> cards;

    public static ListOfBoardViewDto of (ListOfBoard listOfBoard, List<CardViewDto> cards){
        return new ListOfBoardViewDto(listOfBoard.getId(),
                listOfBoard.getTitle(),
                listOfBoard.getOrderNumber(),
                listOfBoard.getBoard().getId(),
                cards);
    }
}
