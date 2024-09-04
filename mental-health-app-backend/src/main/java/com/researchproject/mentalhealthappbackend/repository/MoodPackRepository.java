package com.researchproject.mentalhealthappbackend.repository;

import com.researchproject.mentalhealthappbackend.entity.MoodPack;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MoodPackRepository extends JpaRepository<MoodPack, Long> {
	List<MoodPack> findByUserIdAndTag(Long userId, String tag);

	List<MoodPack> findByIsPublic(boolean isPublic);
}