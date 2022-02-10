package com.dd.api.dto.response;

import java.util.UUID;

import com.dd.db.enums.Code;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@ApiModel("noticeGetListResponseDto")
public class NoticeGetListResponseDto {

	@ApiModelProperty(name="알림장 UUID")
	private UUID noticeId;
	
	@ApiModelProperty(name="작성자 이름")
	private String userName;
	
	@ApiModelProperty(name="알림장 제목", example = "기말고사 일정 안내")
	private String title;

	@ApiModelProperty(name="알림장 코드", example = "전체->K01, 학년->K02, 반->K03")
	private Code noticeCode;
	
	@ApiModelProperty(name="알림장 구분 String", example = "전체, 2학년, 2학년 7반")
	private String noticeCodeString;
	
	@ApiModelProperty(name="알림장 조회수", example="21")
	private int hit;
	
	@ApiModelProperty(name="등록일자", example="2022-01-27")
	private String regTime;
	
}
