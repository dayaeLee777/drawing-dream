package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.request.ChatRoomRequestDTO;
import com.dd.api.dto.request.ChatRoomUserRequestDTO;
import com.dd.api.dto.response.ChatRoomGetListWrapperResponseDTO;
import com.dd.api.dto.response.ChatRoomResponseDTO;
import com.dd.api.dto.response.ChatRoomWithMessageResponseDTO;

public interface ChatRoomService {

	ChatRoomGetListWrapperResponseDTO findAllRooms(String accessToken);

	ChatRoomWithMessageResponseDTO findByRoomId(UUID roomId);

	ChatRoomResponseDTO createRoom(ChatRoomRequestDTO chatRoomRequestDTO, String accessToken);

	void addUser(UUID roomId, ChatRoomUserRequestDTO chatRoomUserRequestDTO);

	void leaveRoom(UUID roomId, String accessToken);

}