package com.dd.api.controller;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.StudyRecordRegistRequestDto;
import com.dd.api.dto.response.StudyRecordFinishResponseDto;
import com.dd.api.dto.response.StudyRecordGetListWrapperResponseDto;
import com.dd.api.dto.response.StudyRecordResponseDto;
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
	
	@PutMapping("/{studyRecordId}")
	@ApiOperation(value = "공부시간 기록 종료하기", notes="<strong>공부시간 기록을 종료한다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="공부시간 기록이 정상적으로 종료되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="공부시간 기록 종료를 실패했습니다.")
	})
	public ResponseEntity<StudyRecordFinishResponseDto> finish(
			@PathVariable("studyRecordId") @RequestBody @ApiParam(value = "종료할 공부기록", required = true) UUID studyRecordId){
		return ResponseEntity.status(200).body(studyRecordService.finishStudyRecord(studyRecordId));
	}
	
	@GetMapping("/list/{studyDate}")
	@ApiOperation(value = "오늘의 공부시간 목록 불러오기", notes="<strong>로그인한 유저, 지정날짜에 대한 공부시간 기록을 불러온다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="오늘의 공부시간 목록을 정상적으로 조회하였습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="오늘의 공부시간 조회를 실패했습니다.")
	})
	public ResponseEntity<StudyRecordGetListWrapperResponseDto> getStudyRecordList(
			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@PathVariable("studyDate") @RequestBody @ApiParam(value = "공부한 날짜", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate studyDate) {
		return ResponseEntity.status(200).body(studyRecordService.getStudyRecordListByDate(accessToken, studyDate));
	}

	@GetMapping("/{studyRecordId}")
	@ApiOperation(value = "오늘의 공부시간 불러오기", notes="<strong>studyRecordId 에 해당하는 오늘의 공부시간 기록을 불러온다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="오늘의 공부시간을 정상적으로 조회하였습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="오늘의 공부시간 조회를 실패했습니다.")
	})
	public ResponseEntity<StudyRecordResponseDto> getStudyRecord(
			@PathVariable("studyRecordId") @RequestBody @ApiParam(value = "조회할 studyRecordId", required = true) UUID studyRecordId){
		return ResponseEntity.status(200).body(studyRecordService.getStudyRecord(studyRecordId));
	}
}
