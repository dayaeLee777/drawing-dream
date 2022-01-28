package com.dd.api.service;

import java.util.List;
import java.util.UUID;

import com.dd.api.dto.response.ChatRoomResponseDTO;
import com.dd.db.entity.chat.ChatRoom;

public interface ChatRoomService {

	List<ChatRoom> findAllRooms();

	ChatRoomResponseDTO findByRoomId(UUID roomId);

	UUID createRoom(String name);

}