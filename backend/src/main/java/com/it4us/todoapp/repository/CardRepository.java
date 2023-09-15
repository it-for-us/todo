package com.it4us.todoapp.repository;

import com.it4us.todoapp.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    @Query(value = "SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM lists l " +
            "join Boards b on l.board_id = b.board_id " +
            "join Workspaces w on b.workspace_id = w.workspace_id " +
            "join Users u on w.user_id = u.user_id " +
            "where l.list_id = :listId and u.user_id= (select user_id from users where username= :username)", nativeQuery = true)
    boolean isListBelongToUser(@Param("listId") Long listId, @Param("username") String username);

    @Query(value = "select * from cards c where c.list_id = :listId", nativeQuery = true)
    List<Card> findAllCardsByListId(@Param("listId") Long listId);

    @Query(value = "select * from cards c where c.list_id = :listId and " +
            "(c.order_number BETWEEN :minOrder AND :maxOrder)" , nativeQuery = true)
    List<Card> findCardsInRange(@Param("listId")Long listId,
                                @Param("minOrder")Integer minOrder,
                                @Param("maxOrder") Integer maxOrder);

    @Query(value = "SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM cards c " +
            "where c.list_id = :listId and c.title= :cardTitle", nativeQuery = true)
    boolean isCardExistInList(String cardTitle, Long listId);
}
