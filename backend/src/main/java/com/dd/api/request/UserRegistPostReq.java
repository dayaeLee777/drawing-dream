package com.dd.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel("UserRegustPostReq")
public class UserRegistPostReq {

	@ApiModelProperty(name="회원 아이디", example="user1234")
	private String userId;
	
	@ApiModelProperty(name="회원 비밀번호")
	private String userPassword;
}
