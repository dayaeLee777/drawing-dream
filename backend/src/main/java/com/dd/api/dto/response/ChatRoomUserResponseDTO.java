package com.dd.api.dto.response;

import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ChatRoomUserResponseDTO")
public class ChatRoomUserResponseDTO {

	@ApiModelProperty(name = "채팅방 유저 정보 - UUId")
	UUID userId;

	@ApiModelProperty(name = "채팅방 유저 정보 - 이름")
	String userName;

}
