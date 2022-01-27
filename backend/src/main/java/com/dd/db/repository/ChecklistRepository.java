package com.dd.db.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.addon.Checklist;

@Repository
public interface ChecklistRepository extends JpaRepository<Checklist, UUID> {
	List<Checklist> findByUserIdAndDelYnAndIsCheckedOrderByRegTimeDesc(UUID userId, boolean delYn, boolean isChecked);
	List<Checklist> findByUserIdAndDelYnAndIsChecked(UUID userId, boolean delYn, boolean isChecked, Sort sort);
}
