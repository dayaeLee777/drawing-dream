package com.dd.db.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;

@Repository
public interface AuthRepository extends JpaRepository<Auth, UUID> {
	
	Optional<Auth> findByUser(User user);
	
	Optional<Auth> findByLoginId(String loginId);
	
	Boolean existsByLoginId(String loginId);
	
	@Query("SELECT a.user FROM Auth a LEFT JOIN User u ON a.user = u WHERE a.loginId = :loginId")
	Optional<User> findUserByLoginId(@Param("loginId") String loginId);

}
