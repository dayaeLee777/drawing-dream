package com.dd.api.dto.request;

import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@ApiModel("ChatRoomRequestDTO")
public class ChatRoomRequestDTO {

	@ApiModelProperty(name = "채팅방 정보 - 이름", example = "채팅방")
	private String name;

	@ApiModelProperty(name = "채팅방 정보 - 참여 인원")
	private List<ChatRoomUserRequestDTO> userList;

}
