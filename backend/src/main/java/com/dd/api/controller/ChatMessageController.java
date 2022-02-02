package com.dd.api.controller;

import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.ChatMessageRequestDTO;
import com.dd.api.service.ChatMessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatMessageController {

	// 특정 Broker 로 메시지를 전달
	private final SimpMessagingTemplate template;

	private final ChatMessageService chatMessageService;

	// 채팅방 입장
	@MessageMapping("/chat/enter")
	public void enterChat(ChatMessageRequestDTO message, @Header("Authorization") String token) throws Exception {

		System.out.println("ChatMessageController enterChat : " + message);

		template.convertAndSend("/topic/room/" + message.getRoomId(),
				chatMessageService.sendMessage(message, token, true));

	}

	// 메시지 전송
	@MessageMapping("/chat/room")
	public void sendMessage(ChatMessageRequestDTO message, @Header("Authorization") String token) throws Exception {

		System.out.println("ChatMessageController sendMessage : " + message);

		template.convertAndSend("/topic/room/" + message.getRoomId(),
				chatMessageService.sendMessage(message, token, false));

	}

//	@MessageMapping("/chat/one")
//	public void sendToOne(ChatMessageRequestDTO message, @Header("Authorization") String token) throws Exception {
//		UUID roomId = message.getRoomId();
////		UUID userId = getUserId(token);
//		String username = jwtAuthenticationProvider.getUsername(token.substring(7));
//
//		ChatMessageResponseDTO response = ChatMessageResponseDTO.builder().content(message.getContent())
//				.sendTime(LocalDateTime.now()).userName(username).build();
//
//		template.convertAndSendToUser(username.toString(), "/queue/" + response.getRoomId(), response);
//	}

//	public UUID getRoomId(String uuid) {
//		return new UUID(new BigInteger(uuid.substring(0, 16), 16).longValue(),
//				new BigInteger(uuid.substring(16), 16).longValue());
//	}

}
