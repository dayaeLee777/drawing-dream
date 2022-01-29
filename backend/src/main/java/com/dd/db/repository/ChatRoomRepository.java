package com.dd.db.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.chat.ChatRoom;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {

//	Optional<ChatRoom> findById(String roomId);
//	private Map<String, ChatRoom> chatRoomDTOMap;
//
//	@PostConstruct
//	private void init() {
//		chatRoomDTOMap = new LinkedHashMap<>();
//	}
//
//	public List<ChatRoom> findAllRoom() {
//		List<ChatRoom> chatRooms = new ArrayList<>(chatRoomDTOMap.values());
//		// 채팅방 생성 순서 최근 순으로 반환
//		Collections.reverse(chatRooms);
//
//		return chatRooms;
//	}
//
//	public ChatRoom findByRoomId(String roomId) {
//		return chatRoomDTOMap.get(roomId);
//	}
//
//	public ChatRoom createChatRoomDTO(String name) {
//		ChatRoom room = ChatRoom.create(name);
//		chatRoomDTOMap.put(room.getRoomId(), room);
//
//		return room;
//	}

}
