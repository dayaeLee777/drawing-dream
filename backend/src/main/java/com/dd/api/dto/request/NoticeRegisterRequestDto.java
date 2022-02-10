package com.dd.api.dto.request;

import com.dd.db.enums.Code;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("noticeRegisterRequestDto")
public class NoticeRegisterRequestDto {
	
	@ApiModelProperty(name="알림장 제목", example = "기말고사 일정 안내")
	private String title;
	
//	@Lob
	@ApiModelProperty(name="알림장 내용", example = "2022년 1학기 기말고사 일정 안내입니다.")
	private String content;

	@ApiModelProperty(name="알림장 코드", example = "전체-K01, 학년-K02, 반-K03")
	private Code noticeCode;
	
}
