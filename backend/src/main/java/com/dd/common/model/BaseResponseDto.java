package com.dd.common.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/*
  기본 Response 정의
*/
@Getter
@Setter
@AllArgsConstructor
@ApiModel("BaseResponseDto")
public class BaseResponseDto {
	
	@ApiModelProperty(name="응답 메세지", example="정상")
	String message = null;
	
	@ApiModelProperty(name="응답 코드", example="200")
	Integer statusCode = null;
	
	public BaseResponseDto() {}
	
	public BaseResponseDto(Integer statusCode) {
		this.statusCode = statusCode;
	}
	
	public BaseResponseDto(Integer statusCode, String message) {
		this.statusCode = statusCode;
		this.message = message;
	}
	
	public static BaseResponseDto of(Integer statusCode, String message) {
		BaseResponseDto baseResponse = new BaseResponseDto();
		baseResponse.statusCode = statusCode;
		baseResponse.message = message;
		return baseResponse;
	}
}
