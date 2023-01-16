package com.it4us.todoapp.repository;

import com.it4us.todoapp.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    Optional<Board> findByName(String name);

    List<Board> findByWorkspaceId(Optional<Long> workspaceId);

    @Query(value = "select count(*) from workspaces where user_id= (select user_id from users where username= :username ) and workspace_id= (select workspace_id from boards where board_id = :boardId )", nativeQuery = true)
    int isBoardBelongedUser(@Param("boardId") Long boardId, @Param("username") String username);
}
