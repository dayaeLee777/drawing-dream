package com.dd.db.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.schoollife.Score;
import com.dd.db.entity.user.User;

@Repository
public interface ScoreRepository extends JpaRepository<Score, UUID> {
	
	Optional<List<Score>> findByUserAndDelYn(User user, boolean delYn, Sort sort);

}
