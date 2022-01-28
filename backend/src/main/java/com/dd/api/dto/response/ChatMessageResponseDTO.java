package com.dd.api.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

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
@ApiModel("ChatMessageResponseDTO")
public class ChatMessageResponseDTO {

	@ApiModelProperty(name = "채팅방 uuid", example = "00000000-0000-0000-0000-00000000")
	UUID roomId;

	@ApiModelProperty(name = "메시지 내용", example = "안녕")
	private String content;

	@ApiModelProperty(name = "메시지 보낸 시간", example = "2022-01-01")
	private LocalDateTime sendTime;

	@ApiModelProperty(name = "메시지 보낸 사용자 id", example = "user123")
	private String username;

	@Builder
	public ChatMessageResponseDTO(UUID roomId, String content, LocalDateTime sendTime, String username) {
		this.roomId = roomId;
		this.content = content;
		this.sendTime = sendTime;
		this.username = username;
	}

	public void setContent(String content) {
		this.content = content;
	}

}
