package com.dd.db.repository.schoollife;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.schoollife.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, UUID> {
	Optional<Attendance> findByDate(Date date);
	Optional<Attendance> findByDateAndUserId(Date date, UUID userId);
}
