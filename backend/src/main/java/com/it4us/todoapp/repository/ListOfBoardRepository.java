package com.it4us.todoapp.repository;

import com.it4us.todoapp.entity.Card;
import com.it4us.todoapp.entity.ListOfBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ListOfBoardRepository extends JpaRepository<ListOfBoard,Long> {

    @Query(value = "SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM Boards b " +
            "join Workspaces w on b.workspace_id = w.workspace_id " +
            "join Users u on w.user_id = u.user_id " +
            "where b.board_id = :boardId and u.user_id= (select user_id from users where username= :username)", nativeQuery = true)
    boolean isBoardBelongedUser(@Param("boardId") Long boardId, @Param("username") String username);

    @Query(value = "select * from lists l where l.board_id = :boardId", nativeQuery = true)
    List<ListOfBoard> findAllListsByBoardId(@Param("boardId") Long boardId);

    @Query(value = "select * from lists l where l.board_id = :boardId and " +
            "(l.order_number BETWEEN :minOrder AND :maxOrder)" , nativeQuery = true)
    List<ListOfBoard> findListsInRange(@Param("boardId")Long boardId,
                                       @Param("minOrder")Integer minOrder,
                                       @Param("maxOrder") Integer maxOrder);

    @Query(value = "SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM lists l " +
            "where l.board_id = :boardId and l.title= :listTitle", nativeQuery = true)
    boolean isListExistInBoard(String listTitle, Long boardId);

    @Query(value = "select * from cards c where c.list_id = :listOfBoardId", nativeQuery = true)
    List<Card> getAllCardsByListId(@Param("listOfBoardId")Long listOfBoardId);

}
