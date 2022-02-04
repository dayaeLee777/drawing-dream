package com.dd.db.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.addon.StudyRecord;

public interface StudyRecordRepository extends JpaRepository<StudyRecord, UUID> {
	
}
