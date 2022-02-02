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
@ApiModel("ChatMessageResponseDTO")
public class ChatMessageResponseDTO {

	@ApiModelProperty(name = "메시지 내용", example = "안녕")
	private String content;

	@ApiModelProperty(name = "메시지 보낸 시간", example = "2022-01-01")
	private LocalDateTime sendTime;

	@ApiModelProperty(name = "메시지 보낸 사용자 UUID", example = "user123")
	private UUID userId;

	@ApiModelProperty(name = "메시지 보낸 사용자 이름", example = "김싸피")
	private String userName;

	@Builder
	public ChatMessageResponseDTO(String content, LocalDateTime sendTime, UUID userId, String userName) {
		this.content = content;
		this.sendTime = sendTime;
		this.userId = userId;
		this.userName = userName;
	}

}
