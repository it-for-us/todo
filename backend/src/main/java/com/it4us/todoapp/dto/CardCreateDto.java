package com.it4us.todoapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardCreateDto {

    private Long id;
    private String title;
    private String description;
    private Integer orderNumber;
    private Long listId;

}
