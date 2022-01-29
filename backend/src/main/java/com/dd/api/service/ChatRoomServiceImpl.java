package com.dd.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dd.api.dto.response.ChatRoomGetListResponseDTO;
import com.dd.api.dto.response.ChatRoomGetListWrapperResponseDTO;
import com.dd.api.dto.response.ChatRoomResponseDTO;
import com.dd.db.entity.chat.ChatRoom;
import com.dd.db.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

	private final ChatRoomRepository chatRoomRepository;

	@Override
	public ChatRoomGetListWrapperResponseDTO findAllRooms() {
		List<ChatRoom> result = chatRoomRepository.findAll();

		List<ChatRoomGetListResponseDTO> rooms = new ArrayList<>();
		result.forEach(room -> rooms
				.add(ChatRoomGetListResponseDTO.builder().roomId(room.getId()).name(room.getName()).build()));

		return new ChatRoomGetListWrapperResponseDTO(rooms);
	}

	@Override
	public ChatRoomResponseDTO findByRoomId(UUID roomId) {
		ChatRoom room = chatRoomRepository.findById(roomId).orElse(null);

		return ChatRoomResponseDTO.builder().roomId(room.getId()).name(room.getName()).build();
	}

	@Override
	public UUID createRoom(String name) {
		ChatRoom room = ChatRoom.builder().name(name).build();

		chatRoomRepository.save(room);

		return room.getId();
	}

}
