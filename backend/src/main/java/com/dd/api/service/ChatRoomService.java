package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.response.ChatRoomGetListWrapperResponseDTO;
import com.dd.api.dto.response.ChatRoomResponseDTO;

public interface ChatRoomService {

	ChatRoomGetListWrapperResponseDTO findAllRooms();

	ChatRoomResponseDTO findByRoomId(UUID roomId);

	UUID createRoom(String name);

}