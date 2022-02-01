package com.dd.db.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.school.School;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.enums.Code;

@Repository
public interface UserDepartmentRepository extends JpaRepository<UserDepartment, UUID> {
	
	Optional<UserDepartment> findByUserId(UUID userId);
	Optional<UserDepartment> findByUser(User user);
	Optional<List<UserDepartment>> findBySchoolAndGradeCodeAndClassCode(School school, Code gradeCode, Code classCode);

}
