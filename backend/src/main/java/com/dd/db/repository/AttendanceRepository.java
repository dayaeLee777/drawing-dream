package com.dd.db.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.schoollife.Attendance;
import com.dd.db.entity.user.User;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, UUID> {
	Optional<Attendance> findByDate(LocalDate date);
	Optional<Attendance> findByDateAndUser(LocalDate date, User user);
	Optional<Attendance> findByDateAndUserId(LocalDate date, UUID userId);
	List<Attendance> findByUserIdAndDelYnOrderByDateDesc(UUID userId, boolean delYn);
}
