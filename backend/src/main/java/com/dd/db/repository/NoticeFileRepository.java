package com.dd.db.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.files.NoticeFile;

public interface NoticeFileRepository extends JpaRepository<NoticeFile, UUID> {

}
