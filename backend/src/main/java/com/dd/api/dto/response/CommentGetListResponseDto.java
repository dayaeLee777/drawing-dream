package com.dd.api.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("CommentGetListResponseDto")
public class CommentGetListResponseDto {
	
	@ApiModelProperty(name="회원 정보 - 댓글 작성자 userId")
	private UUID userId;
	
	@ApiModelProperty(name="커뮤니티 댓글 정보 - 내용")
	private String content;
	@ApiModelProperty(name="커뮤니티 댓글 정보 - 작성시간")
	private LocalDateTime regTime;
	@ApiModelProperty(name="커뮤니티 댓글 정보 - commentId")
	private UUID commentId;
	
	@Builder
	public CommentGetListResponseDto(UUID userId, String content, LocalDateTime regTime, UUID commentId) {
		this.userId = userId;
		this.content = content;
		this.regTime = regTime;
		this.commentId = commentId;
	}
}
