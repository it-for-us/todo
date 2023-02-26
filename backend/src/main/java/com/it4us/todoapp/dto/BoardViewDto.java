package com.it4us.todoapp.dto;

import com.it4us.todoapp.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardViewDto {

    private Long id;
    private Long workSpaceId;
    private String name;
    private List<ListOfBoardViewDto> lists;

    public static BoardViewDto of (Board board, List<ListOfBoardViewDto> lists){
        return new BoardViewDto(board.getId(),board.getWorkspace().getId(),board.getName(),lists);
    }
}

