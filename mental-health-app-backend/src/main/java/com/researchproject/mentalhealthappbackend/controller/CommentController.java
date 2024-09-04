package com.researchproject.mentalhealthappbackend.controller;

import com.researchproject.mentalhealthappbackend.entity.Comment;
import com.researchproject.mentalhealthappbackend.entity.MoodPack;
import com.researchproject.mentalhealthappbackend.repository.CommentRepository;
import com.researchproject.mentalhealthappbackend.repository.MoodPackRepository;
import com.researchproject.mentalhealthappbackend.service.CommentService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/{id}")
    public ResponseEntity<List<Comment>> getCommentByMood(
            @PathVariable("id") Long moodId, HttpServletRequest request)  {
        Claims claims = (Claims) request.getAttribute("claims");

        if (claims == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<Comment> comments = commentService.getCommentByMoodId(moodId);
        System.out.println(comments);

        return ResponseEntity.ok(comments);
    }

    @PostMapping("/addcomment")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment, HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");

        if (claims == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Comment savedComment = commentService.addComment(comment);
        System.out.println(savedComment);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }
}
