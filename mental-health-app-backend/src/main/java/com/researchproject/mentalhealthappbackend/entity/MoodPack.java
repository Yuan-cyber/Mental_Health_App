package com.researchproject.mentalhealthappbackend.entity;


import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name="moodpack")
@Data
public class MoodPack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mood_id")
    private Long moodId;

    @Column(name="user_id")
    private long userId;

    @Column(name="tag")
    private String tag;

    @Column(name="topic")
    private String topic;

    @Column(name="description")
    private String description;

    @Column(name="date")
    private LocalDateTime dateTime;

	@Column(name = "public")
	private boolean isPublic = false;

	public boolean isPublic() {
		return isPublic;
	}

	public void setPublic(boolean Public) {
		isPublic = Public;
	}

	public Long getMoodId() {
		return moodId;
	}

	public void setMoodId(Long moodId) {
		this.moodId = moodId;
	}

	public String getTag() {
		return tag;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}


}