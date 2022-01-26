package com.dd.api.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.MemoRegistRequestDto;
import com.dd.api.dto.request.MemoUpdateRequestDto;
import com.dd.api.service.MemoService;
import com.dd.common.model.BaseResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "메모 위젯 API", tags = { "Memo" })
@RestController
@RequestMapping("/api/memo")
public class MemoController {

	@Autowired
	MemoService memoService;
	
	@PostMapping()
	@ApiOperation(value = "메모 등록하기", notes="<strong>로그인한 회원이 작성한 메모를 등록한다.</strong><br/>")
	@ApiResponses({
		@ApiResponse(code=201, message="메모가 정상적으로 등록되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="출석하기를 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponse> regist(
		@ApiIgnore @RequestHeader("Authorization") String accessToken, 
		@RequestBody @ApiParam(value = "등록할 메모", required = true) MemoRegistRequestDto memoRegistRequestDto){
		if(memoService.createMemo(accessToken, memoRegistRequestDto) != null)
			return ResponseEntity.status(200).body(BaseResponse.of(200, "Success"));
		return ResponseEntity.status(409).body(BaseResponse.of(409, "Fail"));
	}
	
	@PutMapping
	@ApiOperation(value = "메모 수정하기", notes="<strong>작성한 메모를 수정한다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="메모가 정상적으로 수정되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="출석하기를 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponse> update(
		@RequestBody @ApiParam(value = "등록할 메모", required = true) MemoUpdateRequestDto memoUpdateRequestDto){
		if(memoService.updateMemo(memoUpdateRequestDto) != null)
			return ResponseEntity.status(200).body(BaseResponse.of(200, "Success"));
		return ResponseEntity.status(409).body(BaseResponse.of(409, "Fail"));
	}
	

}
