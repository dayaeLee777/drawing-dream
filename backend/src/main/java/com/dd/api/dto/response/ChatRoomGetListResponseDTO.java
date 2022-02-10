package com.dd.api.dto.response;

import java.util.List;
import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@ApiModel("ChatRoomGetListResponseDTO")
public class ChatRoomGetListResponseDTO {

	@ApiModelProperty(name = "채팅방 정보 - roomId")
	private UUID roomId;

	@ApiModelProperty(name = "채팅방 정보 - roomName")
	private String roomName;

	@ApiModelProperty(name = "채팅방 정보 - 최근 메시지")
	private ChatMessageResponseDTO message;

	@ApiModelProperty(name = "채팅방 정보 - 참여 인원")
	private List<ChatRoomUserResponseDTO> users;

	@Builder
	public ChatRoomGetListResponseDTO(UUID roomId, String roomName, ChatMessageResponseDTO message,
			List<ChatRoomUserResponseDTO> users) {
		this.roomId = roomId;
		this.roomName = roomName;
		this.message = message;
		this.users = users;
	}

}
