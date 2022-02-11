package com.dd.db.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.schoollife.TimeTable;
import com.dd.db.entity.user.User;

@Repository
public interface TimeTableRepository extends JpaRepository<TimeTable, UUID> {

	List<TimeTable> findByUserAndDelYnOrderByDayCodeAscPeriodCodeAsc(User user, boolean delYn);

	Optional<TimeTable> findByIdAndUser(UUID timeTableId, User user);
}
