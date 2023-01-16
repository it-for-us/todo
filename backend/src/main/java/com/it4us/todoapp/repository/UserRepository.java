package com.it4us.todoapp.repository;

import com.it4us.todoapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<?> findOneByEmailIgnoreCaseAndPassword(String email, String password);
}
