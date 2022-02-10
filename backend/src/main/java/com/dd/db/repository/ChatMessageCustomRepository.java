package com.dd.db.repository;

import java.util.List;
import java.util.Optional;

import com.dd.db.entity.chat.ChatMessage;
import com.dd.db.entity.chat.ChatRoom;

public interface ChatMessageCustomRepository {

	Optional<List<ChatMessage>> findAllMessages(ChatRoom chatRoom);

	Optional<ChatMessage> findLastMessage(ChatRoom chatRoom);

}
