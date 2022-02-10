package com.dd.api.dto.response;

import java.util.UUID;

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
@ApiModel("meetingResponseDto")
public class MeetingResponseDto {
	
	@ApiModelProperty(name="noticeId", example="00000000-0000-0000-0000-00000000")
	UUID noticeId;
	
	@ApiModelProperty(name="제목", example="조회, 종례 제목입니다.")
	String title;
	
	@ApiModelProperty(name="내용", example="조회, 종례 내용입니다.")
	String content;
	
	@ApiModelProperty(name="등록날짜", example="2022-01-27")
	String regDate;
	
}
