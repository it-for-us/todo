package com.it4us.todoapp.repository;

import com.it4us.todoapp.entity.Board;
import com.it4us.todoapp.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board,Long> {

    Optional<Board> findByName(String name);


    //@Query("select Board b from Boards where b.workspace_id = :workspaceId ")
    //@Query("select "+ "board.name as board_name, board.id as board_id, board.workspace as workspace_id from boards board "
           // + "where board.workspace= :workspaceId")
   // @Query("select b from boards b where b.workspace_id = ?1")
    @Query("select b from Board b where b.workspace_id = ?1")
    List<Board> findBoardsByWorkspaceId(Long workspaceId);

}
