package com.it4us.todoapp.repository;

import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    Optional<Workspace> findByName(String name);



}
