package com.researchproject.mentalhealthappbackend.repository;

import com.researchproject.mentalhealthappbackend.entity.Comment;

import java.util.List;

import com.researchproject.mentalhealthappbackend.entity.MoodPack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByMoodId(Long moodId);
}

