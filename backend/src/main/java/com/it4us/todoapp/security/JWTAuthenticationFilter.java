package com.it4us.todoapp.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;


import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@RequiredArgsConstructor
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager; //AuthenticationManager Springden geliyor

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {


        //request Body den gonderilen username ve passwordu burada aliyoruz. Springin anlayacagi sekilde token'a cevirip
        //var olan/mevcut calisan authenticationManager'i kendi istegimize gore asagida modifiye ediyoruz.
        //Yani default olarak calistigi gibi degil, boyle calissin diyoruz.

        String email, password ;
        Map<String, String> requestMap;

        UsernamePasswordAuthenticationToken token;
        try {
            requestMap = new ObjectMapper().readValue(request.getInputStream(), Map.class);
            email = requestMap.get("email");
            password = requestMap.get("password");
            token = new UsernamePasswordAuthenticationToken(email, password); //Buradaki token JWT degil.

            return authenticationManager.authenticate(token);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // ustte yazdigimiz islem basarili olursa asagida Jwt token donecegiz.
    //Bunun icin once pom.xml e Auth0 kutuphanesini ekliyoruz. Cunku successfulAuthentication kisminda bir tane JWT generate
    //edilmesi gerekiyor. Bu kutuphaneyle saglyacaz bunu.

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult)
            throws IOException, ServletException {

        //login olmaya calisan user bilgilerini aliyoruz.
        User user = (User) authResult.getPrincipal();

        // Eger login succesful olduysa artik istemci tarafina bir jwt donecez. Simdi de onu olusturalim.
        //Jwt 3 ana kisimdan olusuyor.
        Algorithm algorithm = Algorithm.HMAC256("ToDoApp".getBytes()); //Buradaki secretkey onemli. Cunku jwt verify edilirken bu secret keyi kullaniyor.
        String accessToken = JWT.create()
                .withSubject(user.getUsername())//kullanicinin username. Ama biz email ile giris yapacaz.
                .withExpiresAt(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)) //10 dakika gecerli olsun.
                .withIssuer(request.getRequestURL().toString()) // Bu sorguyu kim  yaptiysa onun bilgisini verdik.
                //.withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);


        // bu tip sistemlerde 2 tane token vardir. Biri accessToken, digeri refreshToken.
        // Accesstoken : Login olduktan sonra sana donulen token i aliyorsun, ondan sonraki requestlerde o tokeni kullaniyorsun
        // Refreshtoken : Accesstoken expired oldugu zaman client sistemin o tokeni otomatik olarak refresh etmesi icin baska bir token daha kulllaniyor. Ona da refresh token deniyor,
        // Refreshtokenin omru genelde Accesstokenin omrunden biraz daha uzun oluyor.

        String refreshToken = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000)) //30 dakika gecerli olsun.
                .withIssuer(request.getRequestURL().toString())
                //.withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);

        Map<String, String> mapResponse= new HashMap<>();
        mapResponse.put("accessToken", accessToken);
        mapResponse.put("username", user.getUsername());
        mapResponse.put("message", "Login Successful");

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        new ObjectMapper().writeValue(response.getOutputStream(), mapResponse);

        //new ObjectMapper().writeValue(response.getOutputStream(), Map.of("access_token",accessToken, "refresh_token", refreshToken));

    }
}

//Springin securitysini modife edip Jwt ile calisacak hale getirmenin ilk adimini attik yukarida.
//Bundan sonra da kullanici sign in olduktan sonra her gelen requestte bu olusturdugumuz JWT yi nasil verify edecez,
//Iste onlari da JWTAuthorizationFilter classinda gerceklestirecez.
