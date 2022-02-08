package com.dd.api.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.AttendanceUpdateRequestDto;
import com.dd.api.dto.response.AttendanceListResponseDto;
import com.dd.api.service.AttendanceService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "출석 API", tags = { "Attendance" })
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/attendance")
public class AttendanceController {

	private final AttendanceService attendanceService;
	
	@PostMapping("/attend")
	@ApiOperation(value = "출석하기", notes="<strong>로그인한 회원의 출석이 오늘 날짜로 등록된다.</strong><br/> 만약 오늘 출석한 이력이 있으면 출석이 되지 않는다(409).")
	@ApiResponses({
		@ApiResponse(code=201, message="출석이 정상적으로 등록되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="출석하기를 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponseDto> attend(
		@ApiIgnore @RequestHeader("Authorization") String accessToken) {
		if(attendanceService.createAttendance(accessToken) != null)
			return ResponseEntity.status(200).body(BaseResponseDto.of(200, "Success"));
		return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));
	}
	
	@GetMapping("/{userId}")
	@ApiOperation(value = "출석 불러오기", notes="<strong>userID에 해당하는 회원의 출석을 날짜순으로 불러온다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="출석을 정상적으로 조회하였습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="출석조회를 실패했습니다.")
	})
	public ResponseEntity<List<AttendanceListResponseDto>> getList(
			@PathVariable("userId") @RequestBody @ApiParam(value = "출석 조회할 유저의 UUID", required = true) UUID userId){
		return ResponseEntity.status(200).body(attendanceService.getAttendancebyUserId(userId));
	}
	
	@PutMapping
	@ApiOperation(value = "출석 수정하기", notes="<strong>출석 UUID, 출석일, 출결상태코드를 이용하여 출석을 수정한다.</strong><br/> 만약 지정한 출석일에 출석이 존재하지 않으면 409 상태코드를 반환한다.")
	@ApiResponses({
		@ApiResponse(code=201, message="출석이 정상적으로 수정되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="출석하기를 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponseDto> update(
			@RequestBody @ApiParam(value = "출석 수정", required = true) AttendanceUpdateRequestDto updateInfo){
		if(attendanceService.updateAttendance(updateInfo) != null)
			return ResponseEntity.status(200).body(BaseResponseDto.of(200, "Success"));
		return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));
	}
	
	@PutMapping("/delete/{attendanceId}")
	@ApiOperation(value = "출석 삭제하기", notes="<strong>출석ID을 이용하여 출석을 삭제한다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="출석이 정상적으로 삭제되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="출석하기를 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponseDto> delete(
			@PathVariable("attendanceId") @RequestBody @ApiParam(value = "삭제할 출석ID ", required = true) UUID attendanceId){
		if(attendanceService.deleteAttendance( attendanceId) != null)
			return ResponseEntity.status(200).body(BaseResponseDto.of(200, "Success"));
		return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));
	}
}
