package com.dd.api.dto.request;

import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("CommentUpdateRequestDto")
@NoArgsConstructor
@Getter
public class CommentUpdateRequestDto {
	
	@ApiModelProperty(name="댓글 정보 - id")
	private UUID commentId;
	
	@ApiModelProperty(name="댓글 정보 - 내용")
	private String content;
}
