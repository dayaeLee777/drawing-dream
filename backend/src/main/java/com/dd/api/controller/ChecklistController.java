package com.dd.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.ChecklistRegistRequestDto;
import com.dd.api.service.ChecklistService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "체크리스 위젯 API", tags = { "Checklist" })
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/checklist")
public class ChecklistController {
	
	private final ChecklistService checklistService;
	
	@PostMapping
	@ApiOperation(value = "체크리스트 등록하기", notes="<strong>로그인한 회원이 작성한 체크리스트를 등록한다.</strong><br/>")
	@ApiResponses({
		@ApiResponse(code=201, message="체크리스트가 정상적으로 등록되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="체크리스트 등록을 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponseDto> regist(
		@ApiIgnore @RequestHeader("Authorization") String accessToken, 
		@RequestBody @ApiParam(value = "등록할 체크리스트", required = true) ChecklistRegistRequestDto checklistRegistRequestDto){
		if(checklistService.createChecklist(accessToken, checklistRegistRequestDto) != null)
			return ResponseEntity.status(200).body(BaseResponseDto.of(200, "Success"));
		return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));
	}
}
