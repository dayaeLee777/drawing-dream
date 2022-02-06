package com.dd.api.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dd.api.dto.request.NoticeRegisterRequestDto;
import com.dd.api.service.NoticeService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "알림장 API", tags = { "Notice" })
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController {

	private final NoticeService noticeService;
	
	@PostMapping
	@ApiOperation(value = "알림장 등록하기", notes="<strong>선생님이 작성한 알림장을 등록한다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="알림장이 정상적으로 등록되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=408, message="학생입니다."),
		@ApiResponse(code=409, message="알림장 등록을 실패했습니다. ")
	})
	public ResponseEntity<? extends BaseResponseDto> regist(
		@ApiIgnore @RequestHeader("Authorization") String accessToken, 
		@ApiParam(value="파일(여러 파일 업로드 가능)", required = true) @RequestPart List<MultipartFile> multipartFile,
		@RequestBody @ApiParam(value = "등록할 알림장", required = true) NoticeRegisterRequestDto noticeRegisterRequestDto){
		
		int result = noticeService.registerNotice(accessToken, multipartFile, noticeRegisterRequestDto);
		
		if(result == 200)
			return ResponseEntity.status(200).body(BaseResponseDto.of(200, "Success"));
		else if(result==401)
			return ResponseEntity.status(401).body(BaseResponseDto.of(401, "Fail"));
		else if(result==408)
			return ResponseEntity.status(408).body(BaseResponseDto.of(408, "Fail"));
		else
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));
	}
	
	@PutMapping("/delete/{noticeId}")
	@ApiOperation(value = "알림장 삭제하기", notes="<strong>작성한 알림장을 삭제한다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="알림장이 정상적으로 삭제되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="알림장 삭제를 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponseDto> delete(
			@PathVariable("noticeId") @RequestBody @ApiParam(value = "삭제할 알림장ID ", required = true) UUID noticeId){
		if(noticeService.deleteNotice(noticeId) != null)
			return ResponseEntity.status(200).body(BaseResponseDto.of(200, "Success"));
		return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));
	}
}
