package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.UserCreateDto;
import com.it4us.todoapp.dto.UserSignInDto;
import com.it4us.todoapp.dto.UserViewDto;
import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.exception.UserExistException;
import com.it4us.todoapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserViewDto create(UserCreateDto userCreateDto) {
        String uuid = UUID.randomUUID().toString();
        User user = new User();

        if(userCreateDto.getUserName() == null){
            String[] temp = userCreateDto.getEmail().split("@");

            Random random = new Random();
            int[] digits = new int[6];
            for (int i = 0; i < 5; i++)
            {
                digits[i] = random.nextInt(9);
            }

            userCreateDto.setUserName(temp[0]+""+digits[0]+""+digits[1]+""+digits[2]+""+digits[3]+""+digits[4]+""+digits[5]);
        }

        if(isEmailExist(userCreateDto.getEmail())){
            throw new UserExistException("user already exist");
        }

        user.setUserName(userCreateDto.getUserName());
        user.setEmail(userCreateDto.getEmail());
        user.setPassword(userCreateDto.getPassword());
        user.setId(uuid);


        return UserViewDto.of(userRepository.save(user));
    }

    @Override
    public Boolean isEmailExist(String email) {
        Optional<?> user = userRepository.findByEmail(email);
        if(user.isPresent())
            return true;
        else
            return false;
    }

    @Override
    public Optional<?> login(UserSignInDto userSignInDto) {

        Optional<?> user = Optional.ofNullable(userRepository.findOneByEmailIgnoreCaseAndPassword(userSignInDto.getEmail(), userSignInDto.getPassword())
                .orElseThrow(() -> new UserExistException("User Not Found")));

        return user;
    }

}
