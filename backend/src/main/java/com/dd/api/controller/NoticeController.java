package com.dd.api.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.dd.api.dto.request.NoticeUpdateRequestDto;
import com.dd.api.dto.response.NoticeGetListResponseDto;
import com.dd.api.dto.response.NoticeGetResponseDto;
import com.dd.api.dto.response.TotalNoticeGetResponseDto;
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
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController {

	private final NoticeService noticeService;
	
	@PostMapping(consumes = {"multipart/form-data"})
//	(consumes = { MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE })
	@ApiOperation(value = "알림장 등록하기", notes="<strong>선생님이 작성한 알림장을 등록한다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="알림장이 정상적으로 등록되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=408, message="학생입니다."),
		@ApiResponse(code=409, message="알림장 등록을 실패했습니다. ")
	})
	public ResponseEntity<? extends BaseResponseDto> regist(
		@ApiIgnore @RequestHeader("Authorization") String accessToken, 
		@ApiParam(value="파일(여러 파일 업로드 가능)") @RequestPart(required = false) List<MultipartFile> multipartFile,
		@ApiParam(value = "등록할 알림장", required = true) @RequestPart NoticeRegisterRequestDto noticeRegisterRequestDto){
		
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
	
	@GetMapping("/total")
	@ApiOperation(value="알림장 글 개수 가져오기")
	public ResponseEntity<TotalNoticeGetResponseDto> getTotalNotice(
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {
		return ResponseEntity.status(200).body(noticeService.getTotalCount(accessToken));
	}
	
	@GetMapping("/list")
	@ApiOperation(value = "알림장 목록 불러오기", notes="<strong>로그인한 유저에게 해당하는 알림장을 불러온다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="알림장 목록을 정상적으로 조회하였습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="메모조회를 실패했습니다.")
	})
	public ResponseEntity<List<NoticeGetListResponseDto>> getNoticeList(
			@ApiIgnore @RequestHeader("Authorization") String accessToken, 
			@PageableDefault(size = 10, sort = {"regTime"}, direction = Sort.Direction.DESC)  Pageable pagealbe ) {
		return ResponseEntity.status(200).body(noticeService.getNoticeList(accessToken, pagealbe));
	}
	
	@GetMapping("/{noticeId}")
	@ApiOperation(value = "알림장 불러오기", notes="<strong>알림장ID에 해당하는 알림장을 불러온다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="알림장을 정상적으로 조회하였습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="알림장 조회를 실패했습니다.")
	})
	public ResponseEntity<NoticeGetResponseDto> getNotice(
			@PathVariable("noticeId") @RequestBody @ApiParam(value = "조회할 알림장ID", required = true) UUID noticeId){
		return ResponseEntity.status(200).body(noticeService.getNotice(noticeId));
	}
	
	@PutMapping
	@ApiOperation(value = "알림장 수정하기", notes="<strong>작성한 알림장을 수정한다.</strong>")
	@ApiResponses({
		@ApiResponse(code=201, message="알림장이 정상적으로 수정되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="알림장수정을 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponseDto> update(
			@ApiIgnore @RequestHeader("Authorization") String accessToken, 
			@ApiParam(value="파일(여러 파일 업로드 가능)") @RequestPart(required = false) List<MultipartFile> multipartFile,
			@ApiParam(value = "수정할 알림장", required = true) @RequestPart NoticeUpdateRequestDto noticeUpdateRequestDto){
		if(noticeService.updateNotice(accessToken, multipartFile, noticeUpdateRequestDto) != null)
			return ResponseEntity.status(200).body(BaseResponseDto.of(200, "Success"));
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
