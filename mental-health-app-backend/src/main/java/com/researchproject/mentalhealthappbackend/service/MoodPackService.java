package com.researchproject.mentalhealthappbackend.service;


import com.researchproject.mentalhealthappbackend.entity.MoodPack;
import com.researchproject.mentalhealthappbackend.repository.MoodPackRepository;
import com.researchproject.mentalhealthappbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MoodPackService {
	@Autowired
    private MoodPackRepository moodPackRepository;

	public List<MoodPack> getMoodPacksByTag(Long userId, String tag) {
		return moodPackRepository.findByUserIdAndTag(userId, tag);
	}

	public MoodPack getMoodPackById(Long id){
		return moodPackRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "MoodPack not found"));

	}

	public MoodPack addMoodPack(MoodPack moodPack){
		moodPack.setDateTime(LocalDateTime.now());
		return moodPackRepository.save(moodPack);
	}

	public void publishMood(Long id) {
		MoodPack moodPack = moodPackRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "MoodPack not found"));
		moodPack.setPublic(true);
		moodPackRepository.save(moodPack);
	}

	public List<MoodPack> findPublicMoodPacks() {
		return moodPackRepository.findByIsPublic(true);
	}
}
