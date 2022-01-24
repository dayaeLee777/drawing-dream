package com.dd.db.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;

@Repository
public interface UserDepartmentRepository extends JpaRepository<UserDepartment, UUID> {
	
	Optional<UserDepartment> findByUserId(UUID userId);
	Optional<UserDepartment> findByUser(User user);

}
