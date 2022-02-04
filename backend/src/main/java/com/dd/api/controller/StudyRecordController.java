package com.dd.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.StudyRecordRegistRequestDto;
import com.dd.api.service.StudyRecordService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "공부시간 기록 API", tags = { "Study Record" })
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/studyrecord")
public class StudyRecordController {
	
	private final StudyRecordService studyRecordService;
	
	@PostMapping
	@ApiOperation(value = "공부시간 기록 시작하기", notes="<strong>로그인한 회원의 공부시간 기록이 시작된다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="공부기록이 정상적으로 등록되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="공부시간 기록을 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponseDto> register(
		@ApiIgnore @RequestHeader("Authorization") String accessToken,
		@RequestBody @ApiParam(value = "공부시간기록", required = true) StudyRecordRegistRequestDto studyRecordRegistRequestDto) {
		if(studyRecordService.createStudyRecord(accessToken, studyRecordRegistRequestDto) != null)
			return ResponseEntity.status(200).body(BaseResponseDto.of(200, "Success"));
		return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));
	}
}
