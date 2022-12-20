package com.it4us.todoapp.dto;

import com.it4us.todoapp.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardViewDto {

    private Long id;
    private Long workSpaceId;
    private String name;

    public static BoardViewDto of (Board board){
        return new BoardViewDto(board.getId(),board.getWorkspace().getId(),board.getName());
    }
}

