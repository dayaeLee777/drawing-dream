package com.dd.api.dto.response;

import java.util.UUID;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("AuthLoginResponseDto")
public class AuthLoginResponseDto extends BaseResponseDto {
	
	@ApiModelProperty(name="유저 정보 - userId")
	private UUID userId;
	@ApiModelProperty(name="토큰")
	private String accessToken;
	
	@Builder
	public AuthLoginResponseDto(UUID userId, String accessToken) {
		this.userId = userId;
		this.accessToken = accessToken;
	}
	
	public static AuthLoginResponseDto of(Integer statusCode, String message, AuthLoginResponseDto authLoginResponseDto) {
		AuthLoginResponseDto res = authLoginResponseDto;
		res.setStatusCode(statusCode);
		res.setMessage(message);
		
		return res;
	}
}
