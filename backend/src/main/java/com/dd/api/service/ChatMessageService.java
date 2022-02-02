package com.dd.api.service;

import java.util.List;
import java.util.UUID;

import com.dd.api.dto.request.ChatMessageRequestDTO;
import com.dd.api.dto.response.ChatMessageResponseDTO;

public interface ChatMessageService {

	void save(ChatMessageRequestDTO message, UUID userId);

	ChatMessageResponseDTO sendMessage(ChatMessageRequestDTO message, String token, boolean isEnter) throws Exception;

	List<ChatMessageResponseDTO> findMessages(UUID roomId);

}
