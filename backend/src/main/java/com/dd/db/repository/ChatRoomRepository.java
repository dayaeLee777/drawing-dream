package com.dd.db.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.chat.ChatRoom;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {

}
