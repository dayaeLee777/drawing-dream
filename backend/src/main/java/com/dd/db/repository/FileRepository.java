package com.dd.db.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.files.Files;

public interface FileRepository extends JpaRepository<Files, UUID> {
	Optional<Files> findByNewFileName(String newFileName);
}
