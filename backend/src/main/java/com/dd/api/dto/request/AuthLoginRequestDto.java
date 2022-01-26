package com.dd.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("AuthLoginPostReq")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AuthLoginRequestDto {
	
	@ApiModelProperty(name="인증 정보 - 아이디", example="user1234")
	private String loginId;
	
	@ApiModelProperty(name="인증 정보 - 비밀번호", notes="영문, 숫자, 특수문자 포함")
	private String password;
}
