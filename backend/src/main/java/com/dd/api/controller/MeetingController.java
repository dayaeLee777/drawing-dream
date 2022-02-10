package com.dd.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.MeetingRequestDto;
import com.dd.api.dto.response.MeetingResponseDto;
import com.dd.api.service.MeetingService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "조회, 종례 API", tags = { "Meeting" })
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/meeting")
public class MeetingController {
	
	private final MeetingService meetingService;
	
	@PostMapping
	@ApiOperation(value = "조회, 종례 불러오기", notes="조회, 종례를 불러온다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="조회, 종례을 정상적으로 조회하였습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="조회, 종례조회를 실패했습니다.")
	})
	public ResponseEntity<MeetingResponseDto> getMeeting(
			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@RequestBody @ApiParam(value = "조회할 조회, 종례 req", required = true) MeetingRequestDto meetingRequestDto){
		return ResponseEntity.status(200).body(meetingService.getMeeting(accessToken, meetingRequestDto));
	}
	
}
