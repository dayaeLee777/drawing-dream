package com.dd.api.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.ChatRoomRequestDTO;
import com.dd.api.dto.response.ChatRoomGetListWrapperResponseDTO;
import com.dd.api.dto.response.ChatRoomResponseDTO;
import com.dd.api.service.ChatRoomService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(value = "Chat Room API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat/room")
public class ChatRoomController {

	private final ChatRoomService chatRoomService;

	@ApiOperation(value = "채팅방 개설")
	@PostMapping
	public ResponseEntity<? extends BaseResponseDto> create(
			@ApiParam(value = "채팅방 이름") @RequestBody ChatRoomRequestDTO chatRoomRequestDTO) {
		String name = chatRoomRequestDTO.getName();
		UUID roomId = chatRoomService.createRoom(name);

		ChatRoomResponseDTO chatRoomResponseDTO = ChatRoomResponseDTO.builder().roomId(roomId).name(name).build();

		return ResponseEntity.ok(ChatRoomResponseDTO.of(200, "Success", chatRoomResponseDTO));
	}

	@ApiOperation(value = "채팅방 조회")
	@GetMapping("/{roomId}")
	public ResponseEntity<? extends BaseResponseDto> getRoom(@ApiParam(value = "채팅방 ID") @PathVariable UUID roomId) {
		ChatRoomResponseDTO chatRoomResponseDTO = chatRoomService.findByRoomId(roomId);

		return ResponseEntity.ok(ChatRoomResponseDTO.of(200, "Success", chatRoomResponseDTO));
	}

	@ApiOperation(value = "채팅방 전체 조회")
	@GetMapping("/all")
	public ResponseEntity<? extends BaseResponseDto> getAllRooms() {
		ChatRoomGetListWrapperResponseDTO chatRoomGetListWrapperResponseDTO = chatRoomService.findAllRooms();

		return ResponseEntity
				.ok(ChatRoomGetListWrapperResponseDTO.of(200, "Success", chatRoomGetListWrapperResponseDTO));
	}

}
