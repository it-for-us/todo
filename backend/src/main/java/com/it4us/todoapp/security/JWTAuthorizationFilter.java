package com.it4us.todoapp.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

//@Component
@RequiredArgsConstructor
//JWTTokenFilter sinifi da denilebilirdi.
public class JWTAuthorizationFilter extends OncePerRequestFilter {


    //Request gelince endpointe ulasmadan once bu filtrenin icinden gececek.
    // Biz kendi filtremizi implement ettigimiz icin onu da sisteme kullandirttiracaz.

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        //eger login ise burayi es gec diyecez.
        if (request.getServletPath().contains("/signin")) { //eger gelen endpointte signin varsa filterchaini devam ettir diyoruz.
            filterChain.doFilter(request, response); //nexti cagirmak gibi

        } else { //eger signin harici bir endpoint gelirse onlari da buraya yazacaz
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION); //gelen requestteki Authorization Header i aldik burada.
            // Ustteki arguman HttpHeaders in springframeworktan gelen paket olduguna dikkat etmek lazim
            if (authHeader != null && authHeader.startsWith("Bearer ")) { // gelen requestlerde   >>> header 'Authorization: Bearer token' <<< seklinde bir ifade oluyor.

                try { //burada gelen token i alacaz once
                    String token = authHeader.split("Bearer ")[1]; //authorization header giderken AuthorizationKey bosluk valuesine de bearer bosluk Jwt geliyor.
                    // onun icin parse ettikten sonra birinci kismi buna denk geliyor. Ondan [1] dedik. Bearer ifadesi ise [0] olmus oluyor.

                    Algorithm algorithm = Algorithm.HMAC256("ToDoApp".getBytes());
                    JWTVerifier jwtVerifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = jwtVerifier.verify(token);
                    String username = decodedJWT.getSubject();


                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request, response);


                } catch (Exception exception) {

                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getOutputStream(), Map.of("message", exception.getMessage()));
                }

            } else {
                filterChain.doFilter(request, response);
            }
        }
    }
}
