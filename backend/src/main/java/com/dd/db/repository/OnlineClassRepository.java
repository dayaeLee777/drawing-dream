package com.dd.db.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.onlineclass.OnlineClass;

public interface OnlineClassRepository extends JpaRepository<OnlineClass, UUID> {

	Optional<OnlineClass> findByCourseId(UUID courseId);

}
