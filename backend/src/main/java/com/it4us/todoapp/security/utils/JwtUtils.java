package com.it4us.todoapp.security.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.it4us.todoapp.entity.User;
import com.it4us.todoapp.exception.UnAuthorizedException;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    private String jwtSecret= "ToDoApp";

    public String generateToken (User user){

        Algorithm algorithm = Algorithm.HMAC256(jwtSecret.getBytes());

        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 100 * 60 * 1000))
                .withIssuer("ToDoApp")
                .sign(algorithm);
    }

    public String getUserFromJWTToken(String jwtToken){

        return JWT.decode(jwtToken).getSubject();

    }

    public Boolean isJWTTokenValid(String jwtToken){

        Algorithm algorithm = Algorithm.HMAC256(jwtSecret.getBytes());
        JWTVerifier verifier= JWT.require(algorithm).build();
        try {
            DecodedJWT decodedJWT= verifier.verify(jwtToken);
            return true;
        }catch (Exception e){
            throw new UnAuthorizedException(e.getMessage());
        }


    }

}
