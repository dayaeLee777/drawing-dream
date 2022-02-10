package com.dd.api.dto.request;

import java.time.LocalDate;

import com.dd.db.enums.Code;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel("meetingRegistRequestDto")
public class MeetingRequestDto {

	@ApiModelProperty(name="날짜", example="2022-02-06")
	private LocalDate date;
	
	@ApiModelProperty(name="조회 종례 코드", example="K04, K05")
	private Code meetingCode;
}
