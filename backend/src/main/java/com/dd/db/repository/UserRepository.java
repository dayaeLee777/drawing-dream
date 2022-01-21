package com.dd.db.repository;

import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.user.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>{
	
	@Transactional
	Optional<User> findById(UUID id);

}
