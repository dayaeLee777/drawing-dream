package com.dd.api.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import com.dd.db.enums.Code;
import com.dd.db.enums.SubCode;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("CalendarGetListResponseDto")
public class CalendarGetListResponseDto {
	
	@ApiModelProperty(name="학사일정 - ID")
	private UUID calendarId;
	@ApiModelProperty(name="학사일정 - 학사일정 코드")
	private Code calendarCode;
	@ApiModelProperty(name="학사일정 - 시험 코드")
	private SubCode testCode;
	@ApiModelProperty(name="학사일정 - 시작 날짜")
	private LocalDate startDate;
	@ApiModelProperty(name="학사일정 - 종료 날짜")
	private LocalDate endDate;
	
	@Builder
	public CalendarGetListResponseDto(UUID calendarId, Code calendarCode, SubCode testCode, LocalDate startDate, LocalDate endDate) {
		this.calendarId   = calendarId;
		this.calendarCode = calendarCode;
		this.testCode     = testCode;
		this.startDate    = startDate;
		this.endDate      = endDate;
	}
}
