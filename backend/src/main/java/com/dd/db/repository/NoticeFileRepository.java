package com.dd.db.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.board.Notice;
import com.dd.db.entity.files.NoticeFile;

public interface NoticeFileRepository extends JpaRepository<NoticeFile, UUID> {
	List<NoticeFile> findByNotice(Notice notice);
}
