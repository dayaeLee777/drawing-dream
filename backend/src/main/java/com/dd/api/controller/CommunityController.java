package com.dd.api.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.CommunityRegisterRequestDto;
import com.dd.api.dto.request.CommunityUpdateRequestDto;
import com.dd.api.dto.response.CommunityGetListResponseDto;
import com.dd.api.dto.response.CommunityGetListWrapperResponseDto;
import com.dd.api.dto.response.CommunityGetResponseDto;
import com.dd.api.service.CommunityService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@Api(value="Community API", tags = { "Community" })
@RequiredArgsConstructor
@RequestMapping("/api/community")
public class CommunityController {

	private final CommunityService communityService;
	
	@PostMapping("/register")
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
		@ApiResponse(code=200, message="게시글이 정상적으로 수정되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="게시글 수정에 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponseDto> updateCommunity(
//			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@RequestBody @ApiParam(value="커뮤니티 게시글 수정 - 게시글 제목, 내용", required=true) CommunityUpdateRequestDto communityRegisterRequestDto) {
//		communityService.writeArticle(accessToken, communityRegisterRequestDto);
		communityService.updateCommunity(communityRegisterRequestDto);
		
		return ResponseEntity.status(200).body(BaseResponseDto.of(200, "게시글이 정상적으로 수정되었습니다."));
	}
	
	@GetMapping("/list")
	@ApiOperation(value="커뮤니티 글 목록 보기 - 글 목록 가져오기")
	public ResponseEntity<? extends BaseResponseDto> getCommunityList() {
//			@ApiIgnore @RequestHeader("Authorization") String accessToken
//		CommunityGetListResponseDto communityGetListResponseDto = communityService.getCommunityList(accesstoken);
		CommunityGetListWrapperResponseDto communityGetListWrapperResponseDto = communityService.getCommunityList();
		
		return ResponseEntity.status(200).body(CommunityGetListWrapperResponseDto.of(200, "게시글 목록을 정상적으로 불러왔습니다", communityGetListWrapperResponseDto));
	}
	
	@GetMapping("/{communityId}")
	@ApiOperation(value="커뮤니티 글 보기 - 글 정보 가져오기")
	public ResponseEntity<? extends BaseResponseDto> getCommunity(
//			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@PathVariable("communityId") @ApiParam(value="가져오려는 커뮤니티 글의 communityId", required=true) UUID communityId) {
//		CommunityGetResponseDto communityGetResponseDto = communityService.getCommunity(accessToken, communityId);
		CommunityGetResponseDto communityGetResponseDto = communityService.getCommunity(communityId);
		
		return ResponseEntity.status(200).body(CommunityGetResponseDto.of(200, "게시글을 정상적으로 불러왔습니다", communityGetResponseDto));
	}
	
	@DeleteMapping("/{communityId}")
	@ApiOperation(value="커뮤니티 글 삭제")
	public ResponseEntity<? extends BaseResponseDto> deleteCommunity(
//			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@PathVariable("communityId") @ApiParam(value="삭제하려는 커뮤니티 글의 communityId", required=true) UUID communityId) {
		if(!communityService.deleteCommunity(communityId)) {
			return ResponseEntity.status(401).body(BaseResponseDto.of(401, "삭제 권한이 없습니다."));
		}
		
		return ResponseEntity.status(200).body(BaseResponseDto.of(200, "게시글을 정상적으로 삭제했습니다."));
	}
	
}
