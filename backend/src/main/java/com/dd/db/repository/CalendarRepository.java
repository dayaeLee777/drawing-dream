package com.dd.db.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.school.Calendar;
import com.dd.db.entity.school.School;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, UUID> {

	Optional<List<Calendar>> findBySchoolAndDelYnOrderByStartDate(School school, boolean delYn);
}
