package com.researchproject.mentalhealthappbackend.repository;

import com.researchproject.mentalhealthappbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

 public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(String name);
}

