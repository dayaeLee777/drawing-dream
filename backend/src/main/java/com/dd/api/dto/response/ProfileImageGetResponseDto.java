package com.dd.api.dto.response;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("ProfileImageGetResponseDto")
public class ProfileImageGetResponseDto extends BaseResponseDto {
	
	@ApiModelProperty(name="프로필 이미지 경로")
	private String fileName;
	
	@Builder
	public ProfileImageGetResponseDto(String fileName) {
		this.fileName = fileName;
	}
	
	public static ProfileImageGetResponseDto of(Integer statusCode, String message, ProfileImageGetResponseDto profileImageGetResponseDto) {
		ProfileImageGetResponseDto res = profileImageGetResponseDto;
		res.setStatusCode(statusCode);
		res.setMessage(message);
		
		return res;
	}
}
