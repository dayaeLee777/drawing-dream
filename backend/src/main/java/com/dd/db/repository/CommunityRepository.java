package com.dd.db.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.board.Community;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.User;

public interface CommunityRepository extends JpaRepository<Community, UUID>{

	Optional<Community> findByUser(User user);
	Optional<List<Community>> findBySchool(School school);
	List<Community> findAll();
	Optional<List<Community>> findBySchoolAndDelYn(School school, boolean delYn);
	Optional<List<Community>> findBySchoolAndDelYnOrderByRegTimeDesc(School school, boolean delYn, Pageable pageable);
}
