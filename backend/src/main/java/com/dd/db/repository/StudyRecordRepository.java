package com.dd.db.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.addon.StudyRecord;
import com.dd.db.entity.user.User;

@Repository
public interface StudyRecordRepository extends JpaRepository<StudyRecord, UUID> {
	List<StudyRecord> findByUserAndDelYnAndStudyDateOrderByStartTime(User user, boolean delYn, LocalDate studyDate);
}
