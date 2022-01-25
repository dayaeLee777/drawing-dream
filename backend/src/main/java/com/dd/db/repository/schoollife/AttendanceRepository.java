package com.dd.db.repository.schoollife;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.schoollife.Attendance;
import com.dd.db.entity.user.User;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, UUID> {
	Optional<Attendance> findByDate(Date date);
	Optional<Attendance> findByDateAndUser(Date date, User user);
	Optional<Attendance> findByDateAndUserId(Date date, UUID userId);
	Boolean findDelYnByDateAndUserId(Date date, UUID userId);
}
