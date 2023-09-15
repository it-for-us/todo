package com.it4us.todoapp.service;

import com.it4us.todoapp.dto.UserCreateDto;
import com.it4us.todoapp.dto.UserSignInDto;
import com.it4us.todoapp.dto.UserSignInResponse;
import com.it4us.todoapp.dto.UserViewDto;
import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.exception.NotFoundException;
import com.it4us.todoapp.exception.UserExistException;
import com.it4us.todoapp.exception.UserNameExistException;
import com.it4us.todoapp.repository.UserRepository;
import com.it4us.todoapp.security.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;


    @Override
    public UserViewDto create(UserCreateDto userCreateDto) {
        String uuid = UUID.randomUUID().toString();
        String username = userCreateDto.getUsername();
        User user = new User();


        if(isEmailExist(userCreateDto.getEmail())) {
            throw new UserExistException("user already exist");
        }else if(isUserNameExist(userCreateDto.getUsername())){
            throw new UserNameExistException("username already exist");
        }
        else if( username == null) {
            String randomUsername = createUsernameIfNoPresent(userCreateDto);
            if(isUserNameExist(randomUsername)) {
                throw new UserNameExistException("username has already been used");
            }else{
                userCreateDto.setUsername(createUsernameIfNoPresent(userCreateDto));
            }
        }


        user.setUsername(userCreateDto.getUsername());
        user.setEmail(userCreateDto.getEmail());
        user.setPassword(encoder.encode(userCreateDto.getPassword()));
        user.setId(uuid);

        return UserViewDto.of(userRepository.save(user));
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User is Not Found"));
    }

    @Override
    public UserSignInResponse login(UserSignInDto userSignInDto) {

        User user = userRepository.findByEmail(userSignInDto.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User is Not Found"));

        UserSignInResponse userSignInResponse = UserSignInResponse.of(user);

        userSignInResponse.setToken(jwtUtils.generateToken(user));

        return userSignInResponse;
    }

    @Override
    public User findByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User is not found"));
    }

    @Override
    public User findByUsername(String username) {

        return userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("User is Not Found "+ username));
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(() ->
                new UsernameNotFoundException("User is Not Found"));

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    private boolean isEmailExist(String email) {
        Optional<?> user = userRepository.findByEmail(email);
        return user.isPresent();
    }

    private boolean isUserNameExist(String userName) {
        Optional<?> user = userRepository.findByUsername(userName);
        return user.isPresent();
    }

    private String createUsernameIfNoPresent(UserCreateDto userCreateDto) {
        String[] temp = userCreateDto.getEmail().split("@");
        int id = new Random().nextInt(99999);

        NumberFormat formatter = new DecimalFormat("00000");
        String number = formatter.format(id);

        StringBuilder stringBuilder = new StringBuilder();
        return stringBuilder.append(temp[0]).append(number).toString();
    }
}
