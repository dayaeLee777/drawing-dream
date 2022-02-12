package com.dd.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.ChatMessageRequestDTO;
import com.dd.api.dto.request.ChatMessageVideoRequestDTO;
import com.dd.api.dto.response.ChatMessageResponseDTO;
import com.dd.db.entity.chat.ChatMessage;
import com.dd.db.entity.chat.ChatRoom;
import com.dd.db.entity.user.User;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.ChatMessageRepository;
import com.dd.db.repository.ChatRoomRepository;
import com.dd.db.repository.UserRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

	private final AuthRepository authRepository;

	private final UserRepository userRepository;

	private final ChatRoomRepository chatRoomRepository;

	private final ChatMessageRepository chatMessageRepository;

	private final JwtAuthenticationProvider jwtAuthenticationProvider;

	@Transactional
	@Override
	public void save(ChatMessageRequestDTO message, UUID userId) {

		ChatRoom chatRoom = chatRoomRepository.findById(message.getRoomId()).get();
		User writer = userRepository.findById(userId).get();

		chatMessageRepository.save(ChatMessage.builder().content(message.getContent()).sendTime(LocalDateTime.now())
				.chatRoom(chatRoom).writer(writer).build());

	}

	@Transactional
	@Override
	public ChatMessageResponseDTO enterRoom(ChatMessageRequestDTO message, String accessToken) throws Exception {

		User writer = authRepository.findUserByLoginId(jwtAuthenticationProvider.getUsername(accessToken.substring(7)))
				.orElseThrow(() -> new Exception("일치하는 회원이 없습니다."));

		return ChatMessageResponseDTO.builder().content(writer.getUserName() + " 님이 채팅방에 입장하였습니다.")
				.sendTime(LocalDateTime.now()).userId(writer.getId()).userName(writer.getUserName()).build();

	}

	@Transactional
	@Override
	public ChatMessageResponseDTO sendMessage(ChatMessageRequestDTO message, String accessToken) throws Exception {

		User writer = authRepository.findUserByLoginId(jwtAuthenticationProvider.getUsername(accessToken.substring(7)))
				.orElseThrow(() -> new Exception("일치하는 회원이 없습니다."));

		// 메시지 전송
		save(message, writer.getId());

		return ChatMessageResponseDTO.builder().content(message.getContent()).sendTime(LocalDateTime.now())
				.userId(writer.getId()).userName(writer.getUserName()).build();

	}

	@Transactional
	@Override
	public ChatMessageResponseDTO sendMessageVideoRoom(ChatMessageVideoRequestDTO message, String accessToken)
			throws Exception {

		User writer = authRepository.findUserByLoginId(jwtAuthenticationProvider.getUsername(accessToken.substring(7)))
				.orElseThrow(() -> new Exception("일치하는 회원이 없습니다."));

		return ChatMessageResponseDTO.builder().content(message.getContent()).sendTime(LocalDateTime.now())
				.userId(writer.getId()).userName(writer.getUserName()).build();

	}

	@Transactional
	@Override
	public List<ChatMessageResponseDTO> findAllMessages(ChatRoom chatRoom) {

		// 1. roomId 가지고 메시지 불러오기
		List<ChatMessage> chatMessageList = chatMessageRepository.findAllMessages(chatRoom).get();
		System.out.println("findMessages : chatMessage - " + chatMessageList.toString());

		// 2. Response 에 메시지 담기
		List<ChatMessageResponseDTO> messages = new ArrayList<>();
		chatMessageList.forEach(message -> messages
				.add(ChatMessageResponseDTO.builder().content(message.getContent()).sendTime(message.getSendTime())
						.userId(message.getWriter().getId()).userName(message.getWriter().getUserName()).build()));

		return messages;

	}

	@Transactional
	@Override
	public ChatMessageResponseDTO findLastMessage(ChatRoom chatRoom) {

		ChatMessage chatMessage = chatMessageRepository.findLastMessage(chatRoom).orElse(null);

		if (chatMessage == null)
			return null;

		ChatMessageResponseDTO message = ChatMessageResponseDTO.builder().content(chatMessage.getContent())
				.sendTime(chatMessage.getSendTime()).userId(chatMessage.getWriter().getId())
				.userName(chatMessage.getWriter().getUserName()).build();

		return message;

	}

}
