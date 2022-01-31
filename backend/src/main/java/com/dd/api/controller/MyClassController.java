package com.dd.api.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.response.MyClassGetListWrapperResponseDto;
import com.dd.api.dto.response.UserInfoResponseDto;
import com.dd.api.service.MyClassService;
import com.dd.api.service.UserService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@CrossOrigin("*")
@Api(value="My Class API", tags = { "My Class" })
@RequiredArgsConstructor
@RequestMapping("/api/myClass")
public class MyClassController {
	
	private final MyClassService myClassService;
	
	@GetMapping
	@ApiOperation(value="우리 반 회원 목록 불러오기")
	@ApiResponses({
		@ApiResponse(code=200, message="회원 목록을 정상적으로 불러왔습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="회원 목록을 불러오지 못했습니다."),
	})
	public ResponseEntity<? extends BaseResponseDto> getMyClassList(
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {
		
		MyClassGetListWrapperResponseDto myClassGetListWrapperResponseDto = myClassService.getMyClassList(accessToken);
		
		return ResponseEntity.status(200).body(MyClassGetListWrapperResponseDto.of(200, "회원 목록을 정상적으로 불러왔습니다", myClassGetListWrapperResponseDto));
	}
}
