package com.dd.api.controller;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.ChatMessageRequestDTO;
import com.dd.api.dto.response.ChatMessageResponseDTO;
import com.dd.db.repository.AuthRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatController {

	// 특정 Broker 로 메시지를 전달
	private final SimpMessagingTemplate template;

	private final JwtAuthenticationProvider jwtAuthenticationProvider;

	private final AuthRepository authRepository;

	@MessageMapping("/chat/enter")
	public void enter(ChatMessageRequestDTO message, @Header("Authorization") String token) throws Exception {
		System.out.println("enterChat : " + message);

		UUID roomId = message.getRoomId();
		System.out.println("enter 채팅방 ID : " + roomId);
//		UUID userId = getUserId(token);
		String username = jwtAuthenticationProvider.getUsername(token.substring(7));

		ChatMessageResponseDTO response = ChatMessageResponseDTO.builder().roomId(roomId)
				.content(username + " 님이 채팅방에 입장하였습니다.").sendTime(LocalDateTime.now()).username(username).build();

		template.convertAndSend("/topic/room/" + message.getRoomId(), response);
	}

	@MessageMapping("/chat/room")
	public void sendToRoom(ChatMessageRequestDTO message, @Header("Authorization") String token) throws Exception {
		UUID roomId = message.getRoomId();
		System.out.println("send 채팅방 ID : " + roomId);
//		UUID userId = getUserId(token);
		String username = jwtAuthenticationProvider.getUsername(token.substring(7));

		ChatMessageResponseDTO response = ChatMessageResponseDTO.builder().roomId(roomId).content(message.getContent())
				.sendTime(LocalDateTime.now()).username(username).build();

		template.convertAndSend("/topic/room/" + message.getRoomId(), response);
	}

	@MessageMapping("/chat/one")
	public void sendToOne(ChatMessageRequestDTO message, @Header("Authorization") String token) throws Exception {
		UUID roomId = message.getRoomId();
//		UUID userId = getUserId(token);
		String username = jwtAuthenticationProvider.getUsername(token.substring(7));

		ChatMessageResponseDTO response = ChatMessageResponseDTO.builder().roomId(roomId).content(message.getContent())
				.sendTime(LocalDateTime.now()).username(username).build();

		template.convertAndSendToUser(username.toString(), "/queue/" + response.getRoomId(), response);
	}

//	public UUID getRoomId(String uuid) {
//		return new UUID(new BigInteger(uuid.substring(0, 16), 16).longValue(),
//				new BigInteger(uuid.substring(16), 16).longValue());
//	}

	public UUID getUserId(String token) throws Exception {
		String username = jwtAuthenticationProvider.getUsername(token);

		return authRepository.findByLoginId(username).orElseThrow(() -> new Exception("일치하는 회원이 없습니다.")).getUser()
				.getId();
	}

}
