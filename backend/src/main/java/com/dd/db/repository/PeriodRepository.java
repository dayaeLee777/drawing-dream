package com.dd.db.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.school.Period;
import com.dd.db.entity.school.School;

public interface PeriodRepository extends JpaRepository<Period, UUID> {
	
	List<Period> findBySchoolOrderByPeriodCode(School school);
	
}
