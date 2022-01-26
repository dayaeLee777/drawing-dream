package com.dd.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.CommunityRegisterRequestDto;
import com.dd.api.service.CommunityService;
import com.dd.common.model.BaseResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@Api(value="Community API")
@RequestMapping("/api/community")
public class CommunityController {

	@Autowired
	CommunityService communityService;
	
	@PostMapping("/write")
	@ApiOperation(value="커뮤니티 게시글 등록")
	@ApiResponses({
		@ApiResponse(code=201, message="게시글이 정상적으로 등록되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="게시글 등록에 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponse> signUp(
			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@RequestBody @ApiParam(value="커뮤니티 게시글 등록 - 게시글 정보", required=true) CommunityRegisterRequestDto communityRegisterRequestDto) {
		communityService.writeArticle(accessToken, communityRegisterRequestDto);
		return ResponseEntity.status(201).body(BaseResponse.of(201, "게시글이 정상적으로 등록되었습니다."));
	}
}
