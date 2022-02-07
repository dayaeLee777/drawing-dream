package com.dd.api.dto.response;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("TotalCommunityGetResponseDto")
public class TotalCommunityGetResponseDto extends BaseResponseDto {
	
	@ApiModelProperty(name="게시글 개수")
	private Integer totalCommunity;
	
	@Builder
	public TotalCommunityGetResponseDto(Integer totalCommunity) {
		this.totalCommunity = totalCommunity;
	}
	
	public static TotalCommunityGetResponseDto of(Integer statusCode, String message, TotalCommunityGetResponseDto totalCommunityGetResponseDto) {
		TotalCommunityGetResponseDto res = totalCommunityGetResponseDto;
		res.setStatusCode(statusCode);
		res.setMessage(message);
		
		return res;
	}
}
