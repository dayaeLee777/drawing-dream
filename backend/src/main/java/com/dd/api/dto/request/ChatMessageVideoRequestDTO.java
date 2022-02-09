package com.dd.api.dto.request;

import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@ApiModel("ChatMessageRequestDTO")
public class ChatMessageVideoRequestDTO {

	@ApiModelProperty(name = "메시지 내용", example = "안녕")
	private String content;

	@ApiModelProperty(name = "수업 UUID", example = "00000000-0000-0000-0000-00000000")
	private UUID courseId;

}
