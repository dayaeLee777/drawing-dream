package com.dd.db.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.board.Community;
import com.dd.db.entity.user.User;

public interface CommunityRepository extends JpaRepository<Community, UUID>{

	Optional<Community> findByUser(User user);
}
