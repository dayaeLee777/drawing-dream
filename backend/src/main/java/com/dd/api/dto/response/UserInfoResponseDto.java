package com.dd.api.dto.response;

import com.dd.common.model.BaseResponse;
import com.dd.db.entity.user.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("UserInfoRes")
public class UserInfoResponseDto extends BaseResponse {
	
	@ApiModelProperty(name="유저 정보 - 이름")
	private String userName;
	
	@ApiModelProperty(name="유저 정보 - 전화번호")
	private String phone;
	
	@ApiModelProperty(name="유저 정보 - 보호자 전화번호")
	private String parentPhone;
	
	@ApiModelProperty(name="유저 정보 - 이메일")
	private String userEmail;
	
	@ApiModelProperty(name="유저 정보 - 주소")
	private String address;
	
	@Builder
	public UserInfoResponseDto(User user) {
		this.userName = user.getUserName();
		this.phone = user.getPhone();
		this.parentPhone = user.getParentPhone();
		this.userEmail = user.getUserEmail();
		this.address = user.getAddress();
	}
	
	@Builder
	public UserInfoResponseDto(Integer statusCode, String message, UserInfoResponseDto userInfoResponseDto) {
		super(statusCode, message);
		this.userName = userInfoResponseDto.userName;
		this.phone = userInfoResponseDto.phone;
		this.parentPhone = userInfoResponseDto.parentPhone;
		this.userEmail = userInfoResponseDto.userEmail;
		this.address = userInfoResponseDto.address;
	}
	
	public static UserInfoResponseDto of(Integer statusCode, String message, UserInfoResponseDto userInfoResponseDto) {
		return new UserInfoResponseDto(statusCode, message, userInfoResponseDto);
	}
	
}
