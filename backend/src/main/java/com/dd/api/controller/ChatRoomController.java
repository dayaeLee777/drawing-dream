package com.dd.api.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.ChatRoomRequestDTO;
import com.dd.api.dto.request.ChatRoomUserRequestDTO;
import com.dd.api.dto.response.ChatRoomGetListWrapperResponseDTO;
import com.dd.api.dto.response.ChatRoomResponseDTO;
import com.dd.api.dto.response.ChatRoomWithMessageResponseDTO;
import com.dd.api.service.ChatRoomService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "Chat Room API", tags = { "Chat Room" })
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat/room")
public class ChatRoomController {

	private final ChatRoomService chatRoomService;

	@ApiOperation(value = "채팅방 개설")
	@PostMapping
	public ResponseEntity<? extends BaseResponseDto> create(
			@ApiParam(value = "채팅방 이름") @RequestBody ChatRoomRequestDTO chatRoomRequestDTO,
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {

		System.out.println("ChatRoomController create : " + chatRoomRequestDTO);

		return ResponseEntity.ok(
				ChatRoomResponseDTO.of(200, "Success", chatRoomService.createRoom(chatRoomRequestDTO, accessToken)));

	}

	@ApiOperation(value = "채팅방 조회")
	@GetMapping("/{roomId}")
	public ResponseEntity<? extends BaseResponseDto> getRoom(@ApiParam(value = "채팅방 ID") @PathVariable UUID roomId) {

		System.out.println("ChatRoomController getRoom : 진입");

		ChatRoomWithMessageResponseDTO chatRoomWithMessageResponseDTO = chatRoomService.findByRoomId(roomId);

		return ResponseEntity.ok(ChatRoomWithMessageResponseDTO.of(200, "Success", chatRoomWithMessageResponseDTO));

	}

	@ApiOperation(value = "내 채팅방 전체 조회")
	@GetMapping("/all")
	public ResponseEntity<? extends BaseResponseDto> getAllRooms(
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {

		System.out.println("ChatRoomController getAllRooms : 진입");

		ChatRoomGetListWrapperResponseDTO chatRoomGetListWrapperResponseDTO = chatRoomService.findAllRooms(accessToken);

		return ResponseEntity
				.ok(ChatRoomGetListWrapperResponseDTO.of(200, "Success", chatRoomGetListWrapperResponseDTO));

	}

	@ApiOperation(value = "채팅방 인원 추가")
	@GetMapping("/add/{roomId}")
	public ResponseEntity<? extends BaseResponseDto> addUser(@ApiParam(value = "채팅방 ID") @PathVariable UUID roomId,
			@ApiParam(value = "채팅방에 추가할 유저") @RequestBody ChatRoomUserRequestDTO chatRoomUserRequestDTO) {

		System.out.println("ChatRoomController addUser : 진입");

		chatRoomService.addUser(roomId, chatRoomUserRequestDTO);

		return ResponseEntity.ok(BaseResponseDto.of(200, "Success"));

	}

	@ApiOperation(value = "채팅방 나가기")
	@GetMapping("/leave/{roomId}")
	public ResponseEntity<? extends BaseResponseDto> leaveRoom(@ApiParam(value = "채팅방 ID") @PathVariable UUID roomId,
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {

		System.out.println("ChatRoomController leaveRoom : 진입");

		chatRoomService.leaveRoom(roomId, accessToken);

		return ResponseEntity.ok(BaseResponseDto.of(200, "Success"));

	}

}
