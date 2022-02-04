package com.dd.db.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.files.ProfileImg;
import com.dd.db.entity.user.User;

public interface ProfileImgRepository extends JpaRepository<ProfileImg, UUID> {
	Optional<ProfileImg> findByNewFileName(String newFileName);
	Optional<ProfileImg> findByUser(User user);
//	Optional<String> findNewFileNameByUser(User user);
}
