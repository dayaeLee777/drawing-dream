package com.dd.api.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("CommunityGetListResponseDto")
public class CommunityGetListResponseDto {
	
	@ApiModelProperty(name="회원 정보 - 커뮤니티 글 작성자 userId")
	private UUID userId;
	
	@ApiModelProperty(name="커뮤니티 글 정보 - 제목")
	private String title;
	@ApiModelProperty(name="커뮤니티 글 정보 - 조회수")
	private int hit;
	@ApiModelProperty(name="커뮤니티 글 정보 - 작성시간")
	private LocalDateTime regTime;
	@ApiModelProperty(name="커뮤니티 글 정보 - communityId")
	private UUID communityId;
	
	@Builder
	public CommunityGetListResponseDto(UUID userId, String title, int hit, LocalDateTime regTime, UUID communityId) {
		this.userId = userId;
		this.title = title;
		this.hit = hit;
		this.regTime = regTime;
		this.communityId = communityId;
	}
}
