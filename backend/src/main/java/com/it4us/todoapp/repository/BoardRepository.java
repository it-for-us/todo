package com.it4us.todoapp.repository;

import com.it4us.todoapp.entity.Board;
import com.it4us.todoapp.entity.Card;
import com.it4us.todoapp.entity.ListOfBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    Optional<Board> findByName(String name);

    @Query(value = "SELECT * FROM boards b where b.workspace_id = :workspaceId", nativeQuery = true)
    List<Board> findBoardsByWorkspaceId(@Param("workspaceId") Long workspaceId);

    @Query(value = "SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM boards b where b.workspace_id = :workspaceId and b.board_name= :boardName", nativeQuery = true)
    Boolean isBoardExistInWorkSpace(@Param("boardName") String boardName, @Param("workspaceId") Long workspaceId);

    List<Board> findByWorkspaceId(Optional<Long> workspaceId);

    @Query(value = "SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM public.boards b inner join public.workspaces w on b.workspace_id = w.workspace_id " +
            "where b.board_id = :boardId and w.user_id= (select user_id from users where username= :username)", nativeQuery = true)
    boolean isBoardBelongToUser(@Param("boardId") Long boardId, @Param("username") String username);

    @Query(value = "select * from lists l where l.board_id = :boardId", nativeQuery = true)
    List<ListOfBoard> getAllListsByBoardId(@Param("boardId")Long boardId);

    @Query(value = "select * from cards c where c.list_id = :listOfBoardId", nativeQuery = true)
    List<Card> getAllCardsByListId(@Param("listOfBoardId")Long listOfBoardId);

}
