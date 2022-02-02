package com.dd.api.dto.response;

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

	@ApiModelProperty(name = "채팅방 정보 - name")
	String name;

	@Builder
	public ChatRoomGetListResponseDTO(UUID roomId, String name) {
		this.roomId = roomId;
		this.name = name;
	}

}
