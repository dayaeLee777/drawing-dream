package com.dd.db.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.school.Study;

@Repository
public interface StudyRepository extends JpaRepository<Study, UUID> {

	Optional<Study> findByIdAndDelYn(UUID studyId, boolean delYn);

	Optional<List<Study>> findByDelYnOrderByRegTimeDesc(boolean delYn);

}
