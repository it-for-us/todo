package com.it4us.todoapp.repository;

import com.it4us.todoapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<?> findByEmail(String email);

    Optional<?> findOneByEmailIgnoreCaseAndPassword(String email, String password);
}
