package com.dd.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.response.CalendarGetListWrapperResponseDto;
import com.dd.api.dto.response.MyClassGetListWrapperResponseDto;
import com.dd.api.service.CalendarService;
import com.dd.api.service.MyClassService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@CrossOrigin("*")
@Api(value="Calendar API", tags = { "Calendar" })
@RequiredArgsConstructor
@RequestMapping("/api/calendar")
public class CalendarController {
	
	private final CalendarService calendarService;
	
	@GetMapping
	@ApiOperation(value="학사일정 목록 불러오기")
	@ApiResponse(code=200, message="학사일정 목록을 정상적으로 불러왔습니다.")
	public ResponseEntity<? extends BaseResponseDto> getCalendarList(
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {
		
		CalendarGetListWrapperResponseDto calendarGetListWrapperResponseDto = calendarService.getCalendarList(accessToken);
		
		return ResponseEntity.status(200).body(CalendarGetListWrapperResponseDto.of(200, "학사일정 목록을 정상적으로 불러왔습니다", calendarGetListWrapperResponseDto));
	}
	
	@GetMapping("/teacher")
	@ApiOperation(value="선생님 - 학사일정 목록 불러오기")
	@ApiResponse(code=200, message="학사일정 목록을 정상적으로 불러왔습니다.")
	public ResponseEntity<? extends BaseResponseDto> getCalendarListForTeacher(
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {
		
		CalendarGetListWrapperResponseDto calendarGetListWrapperResponseDto = calendarService.getCalendarList(accessToken);
		
		return ResponseEntity.status(200).body(CalendarGetListWrapperResponseDto.of(200, "학사일정 목록을 정상적으로 불러왔습니다", calendarGetListWrapperResponseDto));
	}
}
