package com.dd.api.dto.request;

import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("SubCommentRegisterRequestDto")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SubCommentRegisterRequestDto {
	
	@ApiModelProperty(name="게시글 정보 - communityId")
	private UUID communityId;
	
	@ApiModelProperty(name="댓글 정보 - 부모 댓글 commentId")
	private UUID commentId;
	@ApiModelProperty(name="댓글 정보 - 내용")
	private String content;
	
	@ApiModelProperty(name="회원 정보 - 대댓글 작성자 userId")
	private UUID userId;
}
