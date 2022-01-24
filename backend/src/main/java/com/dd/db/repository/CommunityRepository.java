package com.dd.db.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.board.Community;

public interface CommunityRepository extends JpaRepository<Community, UUID>{

}
