package com.dd.db.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.chat.ChatMessage;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {

	@Query("SELECT cm FROM ChatMessage cm LEFT JOIN ChatRoom cr ON cm.chatRoom = cr WHERE cr.id = :roomId ORDER BY cm.sendTime")
	Optional<List<ChatMessage>> findByRoomId(@Param(value = "roomId") UUID roomId);

}
