package com.dd.api.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.dd.db.enums.Code;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("myClassGetListResponseDto")
public class MyClassGetListResponseDto {
	
	@ApiModelProperty(name="회원 정보 - userId")
	private UUID userId;
	@ApiModelProperty(name="회원 정보 - 회원 이름")
	private String userName;
	
	@ApiModelProperty(name="회원 소속 정보 - 유저 코드")
	private Code userCode;
	@ApiModelProperty(name="회원 소속 정보 - 학년 코드")
	private Code gradeCode;
	@ApiModelProperty(name="회원 소속 정보 - 반 코드")
	private Code classCode;
	@ApiModelProperty(name="회원 소속 정보 - 번호")
	private Integer studentNo;
	
	@Builder
	public MyClassGetListResponseDto(UUID userId, String userName, Code userCode, Code gradeCode,  Code classCode, Integer studentNo) {
		this.userId = userId;
		this.userName = userName;
		this.userCode = userCode;
		this.gradeCode = gradeCode;
		this.classCode = classCode;
		this.studentNo = studentNo;
	}
}
