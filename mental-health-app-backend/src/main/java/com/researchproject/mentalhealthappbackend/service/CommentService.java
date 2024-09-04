package com.researchproject.mentalhealthappbackend.service;

import com.researchproject.mentalhealthappbackend.entity.Comment;
import com.researchproject.mentalhealthappbackend.entity.MoodPack;
import com.researchproject.mentalhealthappbackend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getCommentByMoodId(Long moodId){
        return commentRepository.findByMoodId(moodId);
    }

    public Comment addComment(Comment comment){
		 /*
		 When you call save(), it checks if the given entity has a set primary key,
		 if not, it creates a new record, otherwise, it updates the existing record.
		  */
        comment.setTime(LocalDateTime.now());
        return commentRepository.save(comment);
    }
}
