package com.it4us.todoapp.repository;

import com.it4us.todoapp.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board,Long> {

    Optional<Board> findByName(String name);

    Optional<Board> findBoardByName(String name);
}
