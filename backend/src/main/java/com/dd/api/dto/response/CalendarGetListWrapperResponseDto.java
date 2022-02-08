package com.dd.api.dto.response;

import java.util.List;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("CalendarGetListWrapperResponseDto")
public class CalendarGetListWrapperResponseDto extends BaseResponseDto {
	
	@ApiModelProperty(name="학사일정 정보 리스트")
	private List<CalendarGetListResponseDto> calendarGetListResponseDtoList;
	
	@Builder
	public CalendarGetListWrapperResponseDto(List<CalendarGetListResponseDto> calendarGetListResponseDtoList) {
		this.calendarGetListResponseDtoList = calendarGetListResponseDtoList;
	}
	
	public static CalendarGetListWrapperResponseDto of(Integer statusCode, String message, CalendarGetListWrapperResponseDto calendarGetListWrapperResponseDto) {
		CalendarGetListWrapperResponseDto res = calendarGetListWrapperResponseDto;
		res.setStatusCode(statusCode);
		res.setMessage(message);
		
		return res;
	}
}
