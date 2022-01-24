package com.dd.api.dto.request;

import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.enums.Code;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("UserRegistPostReq")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserRegistPostReq {

	@ApiModelProperty(name="인증 정보 - 아이디", example="user1234")
	private String loginId;
	
	@ApiModelProperty(name="인증 정보 - 비밀번호")
	private String password;
	
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
	
	@ApiModelProperty(name="소속 정보 - 학교명")
	private String schoolName;
	
	@ApiModelProperty(name="소속 정보 - 학년")
	private Code gradeCode;
	
	@ApiModelProperty(name="소속 정보 - 반")
	private Code classCode;
	
	@ApiModelProperty(name="소속 정보 - 번호")
	private Integer studentNo;
	
}
