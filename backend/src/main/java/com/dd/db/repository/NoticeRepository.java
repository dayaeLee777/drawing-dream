package com.dd.db.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.board.Notice;

public interface NoticeRepository extends JpaRepository<Notice, UUID>, NoticeRepositorySupport {
}
