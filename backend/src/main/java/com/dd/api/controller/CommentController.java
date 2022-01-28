package com.dd.api.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.CommentRegisterRequestDto;
import com.dd.api.dto.response.CommentGetListWrapperResponseDto;
import com.dd.api.service.CommentService;
import com.dd.api.service.CommentService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@Api(value="Comment API", tags= {"Comment"})
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
	
	private final CommentService commentService;
	
	@PostMapping("/register")
	@ApiOperation(value="커뮤니티 댓글 등록")
	@ApiResponses({
		@ApiResponse(code=201, message="댓글이 정상적으로 등록되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="댓글 등록에 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponseDto> registerComment(
//			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@RequestBody @ApiParam(value="커뮤니티 댓글 등록 - 댓글 정보", required=true) CommentRegisterRequestDto commentRegisterRequestDto) {
//		commentService.registerComment(accessToken, CommentRegisterRequestDto);
		commentService.registerComment(commentRegisterRequestDto);
		
		return ResponseEntity.status(201).body(BaseResponseDto.of(201, "댓글이 정상적으로 등록되었습니다."));
	}
	
	@GetMapping("/list/{communityId}")
	@ApiOperation(value="커뮤니티 댓글 목록 가져오기")
	public ResponseEntity<? extends BaseResponseDto> getCommentList(
//			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@PathVariable("communityId") @ApiParam(value="댓글 목록 가져오려는 커뮤니티 글의 communityId", required=true) UUID communityId) {
//		CommentGetListResponseDto commentGetListResponseDto = CommentService.getCommentList(accesstoken);
		CommentGetListWrapperResponseDto commentGetListWrapperResponseDto = commentService.getCommentList(communityId);
		
		return ResponseEntity.status(200).body(CommentGetListWrapperResponseDto.of(200, "게시글 목록을 정상적으로 불러왔습니다", commentGetListWrapperResponseDto));
	}
}
