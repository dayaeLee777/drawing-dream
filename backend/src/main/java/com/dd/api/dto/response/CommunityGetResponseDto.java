package com.dd.api.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("CommunityGetResponseDto")
public class CommunityGetResponseDto extends BaseResponseDto{
	
	@ApiModelProperty(name="회원 정보 - 댓글 작성자 userid")
	private UUID userId;
	@ApiModelProperty(name="회원 정보 - 커뮤니티 글 작성자")
	private String userName;
	
	@ApiModelProperty(name="커뮤니티 글 정보 - 제목")
	private String title;
	@ApiModelProperty(name="커뮤니티 글 정보 - 내용")
	private String content;
	@ApiModelProperty(name="커뮤니티 글 정보 - 조회수")
	private int hit;
	@ApiModelProperty(name="커뮤니티 글 정보 - 작성시간")
	private LocalDateTime regTime;
	
	@Builder
	public CommunityGetResponseDto(UUID userId, String userName, String title, String content, int hit, LocalDateTime regTime) {
		this.userId = userId;
		this.title = title;
		this.content = content;
		this.hit = hit;
		this.regTime = regTime;
	}
	
	public static CommunityGetResponseDto of(Integer statusCode, String message, CommunityGetResponseDto communityGetResponseDto) {
		CommunityGetResponseDto res = communityGetResponseDto;
		res.setStatusCode(statusCode);
		res.setMessage(message);
		
		return res;
	}
}
