package com.dd.db.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.school.School;

public interface SchoolRepository extends JpaRepository<School, UUID> {
	
	Optional<School> findBySchoolName(String schoolName);
	Optional<School> findBySchoolSerialNo(String schoolSerialNo);
	Optional<UUID> findIdBySchoolName(String schoolName);
}
