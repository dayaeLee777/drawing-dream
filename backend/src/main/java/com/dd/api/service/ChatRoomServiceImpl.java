package com.dd.api.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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

			ChatMessageResponseDTO chatMessageResponseDTO = chatMessageService.findLastMessage(room);

			rooms.add(ChatRoomGetListResponseDTO.builder().roomId(room.getId()).roomName(room.getName())
					.message(chatMessageResponseDTO).users(users).build());
		});

		if (rooms.size() > 1) {
			rooms.sort(new Comparator<ChatRoomGetListResponseDTO>() {

				@Override
				public int compare(ChatRoomGetListResponseDTO o1, ChatRoomGetListResponseDTO o2) {
					if (o1.getMessage() == null || o2.getMessage() == null)
						return 0;

					return o2.getMessage().getSendTime().compareTo(o1.getMessage().getSendTime());
				}

			});
		}

		return ChatRoomGetListWrapperResponseDTO.builder().rooms(rooms).build();

	}

	@Transactional
	@Override
	public ChatRoomWithMessageResponseDTO findByRoomId(UUID roomId) {

		// 채팅방 전체 메시지
		List<ChatMessageResponseDTO> messages = chatMessageService
				.findAllMessages(chatRoomRepository.findById(roomId).get());

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

		// 채팅방 구성 인원 둘일 때 체크
		if (userList.size() == 2) {
			// 내가 속한 채팅방
			List<ChatRoom> myRooms = userChatRoomJoinRepository.findByUserId(me.getId()).get();

			// 상대방
			User opponent = userRepository.findById(userList.get(0).getUserId()).get();
			// 상대가 속한 채팅방
			List<ChatRoom> opponentRooms = userChatRoomJoinRepository.findByUserId(opponent.getId()).get();

			// 상대가 속한 채팅방 확인
			for (ChatRoom oRoom : opponentRooms) {
				// 내 채팅방과 겹치고 인원이 두 명이라면
				if (myRooms.contains(oRoom) && oRoom.getHeadCount() == 2) {
					System.out.println("채팅방 이미 존재");

					users.add(ChatRoomUserResponseDTO.builder().userId(opponent.getId())
							.userName(opponent.getUserName()).build());
					users.add(ChatRoomUserResponseDTO.builder().userId(me.getId()).userName(me.getUserName()).build());

					return ChatRoomResponseDTO.builder().roomId(oRoom.getId()).name(oRoom.getName()).users(users)
							.isNew(false).build();
				}
			}
		}

		// 채팅방 저장(생성)
		ChatRoom room = chatRoomRepository.save(ChatRoom.builder().name(name).headCount(userList.size()).build());

		for (ChatRoomUserRequestDTO userInfo : userList) {
			// 유저 정보
			User user = userRepository.findById(userInfo.getUserId()).get();
			// User-ChatRoom 조인 테이블 저장
			userChatRoomJoinRepository.save(UserChatRoomJoin.builder().user(user).chatRoom(room).build());
			// 채팅방 참여 인원 UUID, 이름 저장
			users.add(ChatRoomUserResponseDTO.builder().userId(user.getId()).userName(user.getUserName()).build());
		}

		return ChatRoomResponseDTO.builder().roomId(room.getId()).name(name).users(users).isNew(true).build();

	}

	@Transactional
	@Override
	public void addUser(UUID roomId, ChatRoomUserRequestDTO chatRoomUserRequestDTO) {

		User user = userRepository.findById(chatRoomUserRequestDTO.getUserId()).get();
		ChatRoom chatRoom = chatRoomRepository.findById(roomId).get();

		userChatRoomJoinRepository.save(UserChatRoomJoin.builder().user(user).chatRoom(chatRoom).build());

		chatRoom.setHeadCount(chatRoom.getHeadCount() + 1);
		chatRoomRepository.save(chatRoom);

	}

	@Transactional
	@Override
	public void leaveRoom(UUID roomId, String accessToken) {

		User me = jwtTokenService.convertTokenToUser(accessToken);
		ChatRoom room = chatRoomRepository.findById(roomId).get();

		userChatRoomJoinRepository.deleteByUserAndChatRoom(me, room);

	}

}
