package com.researchproject.mentalhealthappbackend.controller;


import com.researchproject.mentalhealthappbackend.config.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.researchproject.mentalhealthappbackend.entity.User;
import com.researchproject.mentalhealthappbackend.service.MoodPackService;
import com.researchproject.mentalhealthappbackend.service.UserService;

import java.util.Map;

//annotation
@RestController
public class UserController {
    //Automatically inject UserService and JwtUtil objects
	@Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    //'login' api
    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestBody User user) {
    	Map<String, Object>  isValidUser = userService.validateUser(user.getName(), user.getPassword());
    	System.out.println("receive");
    	if ((boolean)isValidUser.get("valid") == true) {
            System.out.println("login：userId"+isValidUser.get("userid"));
            // generate JWT
            String token = jwtUtil.generateToken(isValidUser.get("userid"));
            if (token == null || token.isEmpty()) {
                throw new IllegalStateException("Failed to generate JWT");
            }
            //put userId into response body
    		return ResponseEntity.ok().body(Map.of("token", token, "userId", isValidUser.get("userid")));
        }
        else {
        System.out.print("Invalid");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid");
        }
    }

    //'create a new user' api
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }
}