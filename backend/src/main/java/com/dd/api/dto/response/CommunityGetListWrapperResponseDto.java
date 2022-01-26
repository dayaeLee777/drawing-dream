package com.dd.api.dto.response;

import java.util.List;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("CommunityGetListWrapperResponseDto")
public class CommunityGetListWrapperResponseDto extends BaseResponseDto{
	
	@ApiModelProperty(name="커뮤니티 정보 리스트")
	private List<CommunityGetListResponseDto> communityGetListResponseDtoList;
	
	@Builder
	public CommunityGetListWrapperResponseDto(List<CommunityGetListResponseDto> communityGetListResponseDtoList) {
		this.communityGetListResponseDtoList = communityGetListResponseDtoList;
	}
	
	public static CommunityGetListWrapperResponseDto of(Integer statusCode, String message, CommunityGetListWrapperResponseDto communityGetListWrapperResponseDto) {
		CommunityGetListWrapperResponseDto res = communityGetListWrapperResponseDto;
		res.setStatusCode(statusCode);
		res.setMessage(message);
		
		return res;
	}
}
