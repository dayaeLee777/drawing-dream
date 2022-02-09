package com.dd.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.response.PeriodGetResponseDto;
import com.dd.api.service.PeriodService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "교시별 시간 API", tags = { "Period" })
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/period")
public class PeriodController {

	private final PeriodService periodService;
		
	@GetMapping
	@ApiOperation(value = "교시별 시간 불러오기", notes="<strong>로그인한 유저의 학교 교시별 시간을 불러온다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="교시별 시간 목록을 정상적으로 조회하였습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="교시별 시간 조회를 실패했습니다.")
	})
	public ResponseEntity<List<PeriodGetResponseDto>> getPeriodList(
			@ApiIgnore @RequestHeader("Authorization") String accessToken ) {
		return ResponseEntity.status(200).body(periodService.getPeriodList(accessToken));
	}
	
}
