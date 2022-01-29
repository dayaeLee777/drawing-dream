package com.dd.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
//@AllArgsConstructor
@ApiModel("ChatMessageRequestDTO")
public class ChatMessageRequestDTO {

	@ApiModelProperty(name = "채팅방 uuid", example = "00000000-0000-0000-0000-00000000")
	String roomId;

	@ApiModelProperty(name = "메시지 내용", example = "안녕")
	private String content;

	@Builder
	public ChatMessageRequestDTO(String roomId, String content) {
		this.roomId = roomId;
		this.content = content;
	}

}
