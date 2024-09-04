package com.researchproject.mentalhealthappbackend.controller;

import com.researchproject.mentalhealthappbackend.entity.MoodPack;
import com.researchproject.mentalhealthappbackend.repository.MoodPackRepository;
import com.researchproject.mentalhealthappbackend.service.MoodPackService;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.server.ResponseStatusException;

import java.util.Enumeration;
import java.util.List;

@RestController
@RequestMapping("/moodpacks")
public class MoodPackController {
    @Autowired
    private MoodPackService moodPackService;

    @GetMapping("/tag")
    public ResponseEntity<List<MoodPack>> getMoodPacksByTag(
            @RequestParam String tag, @RequestParam Long userId, HttpServletRequest request) {
        //get claims from the request to verify the JWT
        Claims claims = (Claims) request.getAttribute("claims");
        System.out.println("claims in /tag: "+claims+tag);
        if (claims == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<MoodPack> moodPacks = moodPackService.getMoodPacksByTag(userId, tag);
        System.out.println(moodPacks);
        //return a list of moodpacks
        return ResponseEntity.ok(moodPacks);
    }

    @PostMapping("/add")
    public ResponseEntity<MoodPack> addMoodPack(@RequestBody MoodPack moodPack, HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");
        System.out.println("claims in /add"+claims);
        if (claims == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        MoodPack savedMoodPack = moodPackService.addMoodPack(moodPack);
        System.out.println(savedMoodPack);
        return new ResponseEntity<>(savedMoodPack, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MoodPack> getMoodPackById(@PathVariable Long id) {
        MoodPack moodPack = moodPackService.getMoodPackById(id);
        return ResponseEntity.ok(moodPack);
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<?> publishMoodPack(@PathVariable Long id, HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");
        System.out.println("claims in /publish"+claims);
        if (claims == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        moodPackService.publishMood(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/public")
    public ResponseEntity<List<MoodPack>> getPublicMoodPacks(HttpServletRequest request) {
        Claims claims = (Claims) request.getAttribute("claims");
        System.out.println("claims in /publish"+claims);
        if (claims == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<MoodPack> moodPacks = moodPackService.findPublicMoodPacks();
        return ResponseEntity.ok(moodPacks);
    }

}
