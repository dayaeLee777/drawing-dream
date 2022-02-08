package com.dd.api.dto.response;

import java.util.Map;
import java.util.UUID;

import com.dd.db.enums.Code;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel("noticeGetResponseDto")
public class NoticeGetResponseDto {

	@ApiModelProperty(name="알림장 UUID")
	private UUID noticeId;
	
	@ApiModelProperty(name="작성자 이름")
	private String userName;
	
	@ApiModelProperty(name="알림장 제목", example = "기말고사 일정 안내")
	private String title;
	
	@ApiModelProperty(name="알림장 내용", example = "2022년 1학기 기말고사 일정 안내입니다.")
	private String content;

	@ApiModelProperty(name="알림장 코드", example = "전체->K01, 학년->K02, 반->K03")
	private Code noticeCode;
	
	@ApiModelProperty(name="알림장 조회수", example="21")
	private int hit;
	
	@ApiModelProperty(name="등록일시", example="2022-01-27 10:08:12")
	private String regTime;
	
	@ApiModelProperty(name="파일", example="orginFile, 파일 URL")
	private Map<String, String> files;
	
	
}
