package com.dd.db.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.onlineclass.OnlineClassParticipant;

@Repository
public interface OnlineClassParticipantRepository extends JpaRepository<OnlineClassParticipant, UUID> {

}
