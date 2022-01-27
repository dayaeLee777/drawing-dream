package com.dd.api.dto.request;

import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("CommentRegisterRequestDto")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CommentRegisterRequestDto {
	
	@ApiModelProperty(name="게시글 정보 - communityId")
	private UUID communityId;
	
	@ApiModelProperty(name="댓글 정보 - 내용")
	private String content;
}
