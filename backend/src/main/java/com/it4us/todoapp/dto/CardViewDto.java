package com.it4us.todoapp.dto;

import com.it4us.todoapp.entity.Card;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardViewDto {

    private Long id;
    private String title;
    private String description;
    private Integer orderNumber;
    private Long listId;

    public static CardViewDto of (Card card){
        return new CardViewDto(card.getId(),
                card.getTitle(),
                card.getDescription(),
                card.getOrderNumber(),
                card.getListOfBoard().getId());
    }
}
