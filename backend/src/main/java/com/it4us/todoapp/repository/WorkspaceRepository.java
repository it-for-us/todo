package com.it4us.todoapp.repository;

import com.it4us.todoapp.entity.Board;
import com.it4us.todoapp.entity.Card;
import com.it4us.todoapp.entity.ListOfBoard;
import com.it4us.todoapp.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    Optional<Workspace> findByName(String name);

    @Query(value = "SELECT * FROM workspaces w where w.user_id = :userId", nativeQuery = true)
    List<Workspace> findWorkspacesByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT CASE WHEN COUNT(w) > 0 THEN true ELSE false END FROM workspaces w where w.user_id = :userId and w.workspace_name= :workspaceName", nativeQuery = true)
    Boolean isWorkspaceExistInUser(@Param("workspaceName") String workspaceName, @Param("userId") Long userId);

    @Query(value = "select * from workspaces w where w.user_id = :userId", nativeQuery = true)
    List<Workspace> findAllByUserId(@Param("userId") Long userId);

    @Query(value = "select * from boards b where b.workspace_id = :workspaceId", nativeQuery = true)
    List<Board> getAllBoardsByWorkspaceId(@Param("workspaceId")Long workspaceId);

    @Query(value = "select * from lists l where l.board_id = :boardId", nativeQuery = true)
    List<ListOfBoard> getAllListsByBoardId(@Param("boardId")Long boardId);

    @Query(value = "select * from cards c where c.list_id = :listOfBoardId", nativeQuery = true)
    List<Card> getAllCardsByListId(@Param("listOfBoardId")Long listOfBoardId);
}
