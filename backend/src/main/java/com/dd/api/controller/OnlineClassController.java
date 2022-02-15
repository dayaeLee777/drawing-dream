package com.dd.api.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dd.api.dto.request.OnlineClassRegisterRequestDTO;
import com.dd.api.dto.response.OnlineClassInfoGetResponseDto;
import com.dd.api.dto.response.OnlineClassResponseDTO;
import com.dd.api.service.OnlineClassService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "온라인 수업 API", tags = { "Online Class" })
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/online")
public class OnlineClassController {

	private final OnlineClassService onlineClassService;

	@ApiOperation(value = "온라인 수업 생성")
	@PostMapping(consumes = {"multipart/form-data"})
	public ResponseEntity<? extends BaseResponseDto> createClass(
			@ApiParam(value="파일(여러 파일 업로드 가능)") @RequestPart(required = false) List<MultipartFile> multipartFile,
			@ApiParam(value = "수업 코드") @RequestPart OnlineClassRegisterRequestDTO onlineClassRegisterRequestDTO,
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {

		System.out.println("OnlineClassController create : " + onlineClassRegisterRequestDTO);

		OnlineClassResponseDTO onlineClassResponseDTO = onlineClassService.createClass(multipartFile, onlineClassRegisterRequestDTO,
				accessToken);

		if (onlineClassResponseDTO == null)
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));

		return ResponseEntity.ok(OnlineClassResponseDTO.of(200, "Success", onlineClassResponseDTO));

	}

	@ApiOperation(value = "온라인 수업 삭제")
	@PutMapping("/{classId}")
	public ResponseEntity<? extends BaseResponseDto> deleteClass(
			@ApiParam(value = "수업 코드") @PathVariable UUID classId,
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {

		System.out.println("OnlineClassController deleteClass : " + classId);

		int result = onlineClassService.deleteClass(classId, accessToken);

		if (result == 0)
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));

		return ResponseEntity.ok(BaseResponseDto.of(200, "Success"));

	}
	
	@ApiOperation(value = "온라인 수업 정보 가져오기")
	@GetMapping("/{courseId}")
	public ResponseEntity<? extends BaseResponseDto> getOnlineClassInfo(
			@ApiParam(value = "courseId") @PathVariable UUID courseId,
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {

		System.out.println("OnlineClassController getOnlineClassInfo : " + courseId);

		OnlineClassInfoGetResponseDto onlineClassInfoGetResponseDto = onlineClassService.getOnlineClassInfo(accessToken, courseId);

		if(onlineClassInfoGetResponseDto == null)
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));
		
		return ResponseEntity.status(200).body(OnlineClassInfoGetResponseDto.of(200, "정상적으로 온라인 수업 정보를 불러왔습니다.", onlineClassInfoGetResponseDto));

	}

}
