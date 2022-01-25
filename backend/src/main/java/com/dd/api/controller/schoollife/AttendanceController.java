package com.dd.api.controller.schoollife;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.service.schoollife.AttendanceService;
import com.dd.common.model.BaseResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "출석 API", tags = { "Attendance" })
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

	@Autowired
	AttendanceService attendanceService;
	
	@PostMapping("/attend")
	@ApiOperation(value = "출석하기", notes="<strong>로그인한 회원의 출석이 오늘 날짜로 등록된다.</strong><br/> 만약 오늘 출석한 이력이 있으면 출석이 되지 않는다(409).")
	@ApiResponses({
		@ApiResponse(code=201, message="출석이 정상적으로 등록되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="출석하기를 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponse> attend(
		@ApiIgnore @RequestHeader("Authorization") String accessToken) {
		if(attendanceService.createAttendance(accessToken) != null)
			return ResponseEntity.status(200).body(BaseResponse.of(200, "Success"));
		return ResponseEntity.status(409).body(BaseResponse.of(409, "Fail"));
	}
}
