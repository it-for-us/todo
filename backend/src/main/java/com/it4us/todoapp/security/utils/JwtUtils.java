package com.it4us.todoapp.security.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.it4us.todoapp.entity.User;

import java.util.Date;

public class JwtUtils {

    public static String generateToken (User user){

        Algorithm algorithm = Algorithm.HMAC256("ToDoApp".getBytes()); //Buradaki secretkey onemli. Cunku jwt verify edilirken bu secret keyi kullaniyor.
        String accessToken = JWT.create()
                .withSubject(user.getUsername())//kullanicinin username. Ama biz email ile giris yapacaz.
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000)) //10 dakika gecerli olsun.
                .withIssuer("ToDoApp") // Bu sorguyu kim  yaptiysa onun bilgisini verdik.
                //.withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);

        return accessToken;
    }

}
