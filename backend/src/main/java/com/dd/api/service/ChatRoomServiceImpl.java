package com.dd.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.ChatRoomRequestDTO;
import com.dd.api.dto.request.ChatRoomUserRequestDTO;
import com.dd.api.dto.response.ChatMessageResponseDTO;
import com.dd.api.dto.response.ChatRoomGetListResponseDTO;
import com.dd.api.dto.response.ChatRoomGetListWrapperResponseDTO;
import com.dd.api.dto.response.ChatRoomResponseDTO;
import com.dd.api.dto.response.ChatRoomUserResponseDTO;
import com.dd.api.dto.response.ChatRoomWithMessageResponseDTO;
import com.dd.db.entity.chat.ChatRoom;
import com.dd.db.entity.chat.UserChatRoomJoin;
import com.dd.db.entity.user.User;
import com.dd.db.repository.ChatRoomRepository;
import com.dd.db.repository.UserChatRoomJoinRepository;
import com.dd.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

	private final ChatRoomRepository chatRoomRepository;

	private final UserRepository userRepository;

	private final UserChatRoomJoinRepository userChatRoomJoinRepository;

	private final ChatMessageService chatMessageService;

	private final JwtTokenService jwtTokenService;

	@Transactional
	@Override
	public ChatRoomGetListWrapperResponseDTO findAllRooms(String accessToken) {

		User me = jwtTokenService.convertTokenToUser(accessToken);
		System.out.println("me: " + me.getId());

		// 내 채팅방
		List<ChatRoom> chatRoomList = userChatRoomJoinRepository.findByUserId(me.getId()).get();
		System.out.println("findAllRooms : chatRoomList - " + chatRoomList.toString());

		List<ChatRoomGetListResponseDTO> rooms = new ArrayList<>();
		chatRoomList.forEach(room -> {
			// 채팅방 참여 인원
			List<User> userList = userChatRoomJoinRepository.findByRoomId(room.getId()).get();

			List<ChatRoomUserResponseDTO> users = new ArrayList<>();

			userList.forEach(user -> users
					.add(ChatRoomUserResponseDTO.builder().userId(user.getId()).userName(user.getUserName()).build()));

			rooms.add(ChatRoomGetListResponseDTO.builder().roomId(room.getId()).roomName(room.getName()).users(users)
					.build());
		});

		return new ChatRoomGetListWrapperResponseDTO(rooms);

	}

	@Transactional
	@Override
	public ChatRoomWithMessageResponseDTO findByRoomId(UUID roomId) {

		// 채팅방 전체 메시지
		List<ChatMessageResponseDTO> messages = chatMessageService.findMessages(roomId);

		// 채팅방 참여 인원
		List<User> userList = userChatRoomJoinRepository.findByRoomId(roomId).get();
		System.out.println("userList: " + userList);

		List<ChatRoomUserResponseDTO> users = new ArrayList<>();
		userList.forEach(user -> users
				.add(ChatRoomUserResponseDTO.builder().userId(user.getId()).userName(user.getUserName()).build()));

		ChatRoom room = chatRoomRepository.findById(roomId).orElse(null);

		return ChatRoomWithMessageResponseDTO.builder().roomName(room.getName()).messages(messages).users(users)
				.build();

	}

	@Transactional
	@Override
	public ChatRoomResponseDTO createRoom(ChatRoomRequestDTO chatRoomRequestDTO, String accessToken) {

		// 내 정보
		User me = jwtTokenService.convertTokenToUser(accessToken);
		// 채팅방 이름
		String name = chatRoomRequestDTO.getName();
		// 채팅방 참여 인원 UUID 목록
		List<ChatRoomUserRequestDTO> userList = chatRoomRequestDTO.getUserList();
		// 내 UUID 추가
		userList.add(ChatRoomUserRequestDTO.builder().userId(me.getId()).build());
		// 채팅방 참여 인원 UUID, 이름 목록
		List<ChatRoomUserResponseDTO> users = new ArrayList<>();

		// 채팅방 저장(생성)
		ChatRoom room = chatRoomRepository.save(ChatRoom.builder().name(name).build());

//		if (userList.size() > 2) {
		for (ChatRoomUserRequestDTO userInfo : userList) {
			// 유저 정보
			User user = userRepository.findById(userInfo.getUserId()).get();
			// User-ChatRoom 조인 테이블 저장
			userChatRoomJoinRepository.save(UserChatRoomJoin.builder().user(user).chatRoom(room).build());
			// 채팅방 참여 인원 UUID, 이름 저장
			users.add(ChatRoomUserResponseDTO.builder().userId(user.getId()).userName(user.getUserName()).build());
		}
//		}

		return ChatRoomResponseDTO.builder().roomId(room.getId()).name(name).users(users).build();

	}

	@Transactional
	@Override
	public void addUser(UUID roomId, ChatRoomUserRequestDTO chatRoomUserRequestDTO) {

		User user = userRepository.findById(chatRoomUserRequestDTO.getUserId()).get();
		ChatRoom chatRoom = chatRoomRepository.findById(roomId).get();

		userChatRoomJoinRepository.save(UserChatRoomJoin.builder().user(user).chatRoom(chatRoom).build());

	}

	@Transactional
	@Override
	public void leaveRoom(UUID roomId, String accessToken) {

		User me = jwtTokenService.convertTokenToUser(accessToken);
		ChatRoom room = chatRoomRepository.findById(roomId).get();

		userChatRoomJoinRepository.deleteByUserAndChatRoom(me, room);

	}

}
