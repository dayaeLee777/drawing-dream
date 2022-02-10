package com.dd.api.service;

import java.util.List;
import java.util.UUID;

import com.dd.api.dto.request.ChatMessageRequestDTO;
import com.dd.api.dto.request.ChatMessageVideoRequestDTO;
import com.dd.api.dto.response.ChatMessageResponseDTO;

public interface ChatMessageService {

	void save(ChatMessageRequestDTO message, UUID userId);

	ChatMessageResponseDTO enterRoom(ChatMessageRequestDTO message, String accessToken) throws Exception;

	ChatMessageResponseDTO sendMessage(ChatMessageRequestDTO message, String accessToken) throws Exception;

	ChatMessageResponseDTO sendMessageVideoRoom(ChatMessageVideoRequestDTO message, String accessToken) throws Exception;

	List<ChatMessageResponseDTO> findMessages(UUID roomId);

}
