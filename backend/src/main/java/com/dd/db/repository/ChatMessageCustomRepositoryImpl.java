package com.dd.db.repository;

import java.util.List;
import java.util.Optional;

import com.dd.db.entity.chat.ChatMessage;
import com.dd.db.entity.chat.ChatRoom;
import com.dd.db.entity.chat.QChatMessage;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ChatMessageCustomRepositoryImpl implements ChatMessageCustomRepository {

	private final JPAQueryFactory jpaQueryFactory;

	QChatMessage qChatMessage = QChatMessage.chatMessage;

	@Override
	public Optional<List<ChatMessage>> findAllMessages(ChatRoom chatRoom) {

		Optional<List<ChatMessage>> chatMessages = Optional
				.ofNullable(jpaQueryFactory.select(qChatMessage).from(qChatMessage)
						.where(qChatMessage.chatRoom.eq(chatRoom)).orderBy(qChatMessage.sendTime.asc()).fetch());

		return chatMessages;

	}

	@Override
	public Optional<ChatMessage> findLastMessage(ChatRoom chatRoom) {

		Optional<ChatMessage> chatMessage = Optional.ofNullable(jpaQueryFactory.select(qChatMessage).from(qChatMessage)
				.where(qChatMessage.chatRoom.eq(chatRoom)).orderBy(qChatMessage.sendTime.desc()).fetchFirst());

		return chatMessage;

	}

}
