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
	UUID roomId;

	@ApiModelProperty(name = "채팅방 정보 - roomName")
	String roomName;

	@ApiModelProperty(name = "채팅방 참여 인원")
	private List<ChatRoomUserResponseDTO> users;

	@Builder
	public ChatRoomGetListResponseDTO(UUID roomId, String roomName, List<ChatRoomUserResponseDTO> users) {
		this.roomId = roomId;
		this.roomName = roomName;
		this.users = users;
	}

}
