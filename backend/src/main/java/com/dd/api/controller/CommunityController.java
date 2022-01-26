package com.dd.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.CommunityRegisterRequestDto;
import com.dd.api.dto.request.CommunityUpdateRequestDto;
import com.dd.api.service.CommunityService;
import com.dd.api.service.ProfileService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@Api(value="Community API")
@RequiredArgsConstructor
@RequestMapping("/api/community")
public class CommunityController {

	private final CommunityService communityService;
	
	@PostMapping("/write")
	@ApiOperation(value="커뮤니티 게시글 등록")
	@ApiResponses({
		@ApiResponse(code=201, message="게시글이 정상적으로 등록되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="게시글 등록에 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponseDto> registerCommunity(
//			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@RequestBody @ApiParam(value="커뮤니티 게시글 등록 - 게시글 정보", required=true) CommunityRegisterRequestDto communityRegisterRequestDto) {
//		communityService.writeArticle(accessToken, communityRegisterRequestDto);
		communityService.registerCommunity(communityRegisterRequestDto);
		return ResponseEntity.status(201).body(BaseResponseDto.of(201, "게시글이 정상적으로 등록되었습니다."));
	}
	
	@PutMapping("/update")
	@ApiOperation(value="커뮤니티 게시글 수정")
	@ApiResponses({
		@ApiResponse(code=201, message="게시글이 정상적으로 수정되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="게시글 수정에 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponseDto> updateCommunity(
//			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@RequestBody @ApiParam(value="커뮤니티 게시글 수정 - 게시글 제목, 내용", required=true) CommunityUpdateRequestDto communityRegisterRequestDto) {
//		communityService.writeArticle(accessToken, communityRegisterRequestDto);
		communityService.updateCommunity(communityRegisterRequestDto);
		return ResponseEntity.status(201).body(BaseResponseDto.of(201, "게시글이 정상적으로 등록되었습니다."));
	}
}
