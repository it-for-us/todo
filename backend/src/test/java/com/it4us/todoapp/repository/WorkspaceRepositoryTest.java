package com.it4us.todoapp.repository;

import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.entity.Workspace;
import com.it4us.todoapp.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class WorkspaceRepositoryTest {
    @Autowired
    private WorkspaceRepository workspaceRepositoryUnderTest;

    @Autowired
   UserRepository userRepository;

    @AfterEach
    void tearDown(){
        workspaceRepositoryUnderTest.deleteAll();
    }



    @Test
    void itShouldCheckIfWorkspaceExistInUser() {
       //given
        User user=  new User(null,"9d071c6c-fe7b-4ba5-92e5-b5521676e20b","testuser","test@gmail.com","password");
        User userReturnedFromDB=userRepository.save(user);
        Workspace workspace1 =  new Workspace(null,"testworkspace",userReturnedFromDB);
        workspaceRepositoryUnderTest.save(workspace1);

       //when
       Boolean result;
        result = workspaceRepositoryUnderTest.isWorkspaceExistInUser("testworkspace",userReturnedFromDB.getUserId());

        //then
        Assertions.assertTrue(result);
    }

    @Test
    void itShouldFindAllByUserId() {
        // given
        List<Workspace> givenWorkspaces= new ArrayList<>();
        List<Workspace> expectedWorkspaces= new ArrayList<>();
        User user=  new User(null,"9d071c6c-fe7b-4ba5-92e5-b5521676e20b","testuser","test@gmail.com","password");
        User userReturnedFromDB=userRepository.save(user);

        Workspace workspace1 =  new Workspace(null,"testworkspace",userReturnedFromDB);
        givenWorkspaces.add(workspace1);
        workspaceRepositoryUnderTest.save(workspace1);
        Workspace workspace2 =  new Workspace(null,"testworkspace2",userReturnedFromDB);
        givenWorkspaces.add(workspace2);
        workspaceRepositoryUnderTest.save(workspace2);

        //when
        expectedWorkspaces= workspaceRepositoryUnderTest.findAllByUserId(userReturnedFromDB.getUserId());
        givenWorkspaces.stream().sorted();
        expectedWorkspaces.stream().sorted();

        //then
        Assertions.assertTrue(givenWorkspaces.equals(expectedWorkspaces));
    }
}