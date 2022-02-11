package com.dd.db.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.files.OnlineClassFile;
import com.dd.db.entity.onlineclass.OnlineClass;

public interface OnlineClassFileRepository extends JpaRepository<OnlineClassFile, UUID>{

	List<OnlineClassFile> findByOnlineClass(OnlineClass onlineClass);
	
}
