package com.researchproject.mentalhealthappbackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name="Comment")
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "mood_id")
    private Long moodId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name="text")
    private String text;

    @Column(name="time")
    private LocalDateTime time;

}
