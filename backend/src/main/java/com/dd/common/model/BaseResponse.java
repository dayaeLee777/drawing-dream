package com.dd.common.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/*
  기본 Response 정의
*/
@ApiModel("BaseResponse")
public class BaseResponse {
	
	@ApiModelProperty(name="응답 메세지", example="정상")
	String message = null;
	
	@ApiModelProperty(name="응답 코드", example="200")
	Integer statusCode = null;
	
	public BaseResponse() {}
	
	public BaseResponse(Integer statusCode) {
		this.statusCode = statusCode;
	}
	
	public BaseResponse(Integer statusCode, String message) {
		this.statusCode = statusCode;
		this.message = message;
	}
	
	public static BaseResponse of(Integer statusCode, String message) {
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.statusCode = statusCode;
		baseResponse.message = message;
		return baseResponse;
	}
}
