package com.dd.db.repository;

import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.user.UserDepartment;

@Repository
public interface UserDepartmentRepository extends JpaRepository<UserDepartment, UUID> {
	
	@Transactional
	Optional<UserDepartment> findByUserId(UUID userId);

}
