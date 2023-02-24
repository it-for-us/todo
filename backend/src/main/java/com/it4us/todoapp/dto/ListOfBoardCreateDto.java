package com.it4us.todoapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListOfBoardCreateDto {

    private Long id;
    private String title;
    private Integer orderNumber;
    private Long boardId;

}
