package com.it4us.todoapp.repository;

import com.it4us.todoapp.entity.ListOfBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ListOfBoardRepository extends JpaRepository<ListOfBoard, Long> {

    @Query(value = "SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM lists l where l.board_id = :boardId and l.title= :title", nativeQuery = true)
    Boolean isListExistInBoard(@Param("title") String title, @Param("boardId") Long boardId);

    @Query(value = "select count(*) from workspaces where user_id= (select user_id from users where username= :username ) and workspace_id= (select workspace_id from boards where board_id = :boardId )", nativeQuery = true)
    int isBoardBelongedUser(@Param("boardId") Long boardId, @Param("username") String username);

    @Query(value = "SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END FROM public.lists l inner join public.boards b on b.board_id = l.board_id inner join public.workspaces w on w.workspace_id = b.workspace_id " +
            " where l.list_id= :listId and w.user_id= (select user_id from users where username= :username)", nativeQuery= true)
    Boolean isListBelongedUser(@Param("listId") Long listId, @Param("username") String username);

}
