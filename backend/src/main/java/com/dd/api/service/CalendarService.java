package com.dd.api.service;

import com.dd.api.dto.response.CalendarGetListWrapperResponseDto;

public interface CalendarService {

	String getLoginIdFromToken(String accessToken);

	CalendarGetListWrapperResponseDto getCalendarList(String accessToken);

	CalendarGetListWrapperResponseDto getCalendarListForTeacher(String accessToken);

}
