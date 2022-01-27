package com.dd.db.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.addon.Memo;
import com.dd.db.entity.user.User;

@Repository
public interface MemoRepository extends JpaRepository<Memo, UUID> {
	List<Memo> findByUser(User user);
	List<Memo> findByUserIdAndDelYnOrderByRegTimeDesc(UUID userId, boolean delYn);
}
