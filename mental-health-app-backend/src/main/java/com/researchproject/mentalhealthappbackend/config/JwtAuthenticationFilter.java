package com.researchproject.mentalhealthappbackend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.ServletException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;

import static org.aspectj.weaver.tools.cache.SimpleCacheFactory.path;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final String SECRET_KEY = "hereIsMySuperSuperSuperSecretKey01234567899876543210";
    Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws jakarta.servlet.ServletException, IOException {

        //CORS Headers Setup
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

        // If it is a login request, skip the filter
        String path = request.getRequestURI();
        if (path.equals("/login")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (path.equals("/create")) {
            filterChain.doFilter(request, response);
            return;
        }

        // If it is an OPTIONS request, return 200 directly
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
           response.setStatus(HttpServletResponse.SC_OK);
           return;
        }

        //Extracting the JWT from the Authorization Header
        String authorizationHeader = request.getHeader("Authorization");
        String token = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);}
        System.out.println("Authorization Header: " + authorizationHeader);
        System.out.println("Token again: " + token);

        //Token Validation and Claims Extraction
        try {
            if (token != null) {
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();
                // store claims
                request.setAttribute("claims", claims);
                System.out.println("claims: " + claims);
            } else {
                throw new ServletException("Missing or invalid Authorization header");
            }
        } catch (JwtException e) {
            try {
                System.out.println("JWT Exception: " + e.getMessage());
                throw new ServletException("Invalid token"+e);
            } catch (ServletException ex) {
                throw new RuntimeException(ex);
            }
        } catch (ServletException e) {
            throw new RuntimeException(e);
        }

        // If token is valid，continue
        filterChain.doFilter(request, response);
    }

}
