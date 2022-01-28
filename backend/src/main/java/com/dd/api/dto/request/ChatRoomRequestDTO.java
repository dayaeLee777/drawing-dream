package com.dd.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("ChatRoomRequestDTO")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ChatRoomRequestDTO {

	@ApiModelProperty(name = "채팅방 정보 - 이름", example = "채팅방")
	private String name;

}
