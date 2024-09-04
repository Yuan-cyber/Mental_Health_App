package com.researchproject.mentalhealthappbackend.service;

import com.researchproject.mentalhealthappbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.researchproject.mentalhealthappbackend.entity.User;

import java.util.Map;
import java.util.HashMap;

//annotation
@Service
public class UserService{
	@Autowired
	private UserRepository userRepository;
	 
	 public Map<String, Object> validateUser(String name, String password) {
		    //find users by username through userRepository
		    User user = userRepository.findByName(name);
	        if (user == null) {
	            System.out.print("User: " + name + " not found.");
	        }

	        Map<String, Object> map = new HashMap<>();
			//add userId to the map for subsequent calls
	        map.put("userid", user.getUserId());
			//check password
			if (user.getPassword().equals(password)) {
				map.put("valid", true);
				return map;
			}
			map.put("valid", false);
	        return map;
	    }

	public User createUser(User user) {
		return userRepository.save(user);
	}
}
