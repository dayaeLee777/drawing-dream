package com.dd.api.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.OnlineClassRegisterRequestDTO;
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
	@PostMapping
	public ResponseEntity<? extends BaseResponseDto> createClass(
			@ApiParam(value = "수업 코드") @RequestBody OnlineClassRegisterRequestDTO onlineClassRegisterRequestDTO,
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {

		System.out.println("OnlineClassController create : " + onlineClassRegisterRequestDTO);

		OnlineClassResponseDTO onlineClassResponseDTO = onlineClassService.createClass(onlineClassRegisterRequestDTO,
				accessToken);

		if (onlineClassResponseDTO == null)
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));

		return ResponseEntity.ok(OnlineClassResponseDTO.of(200, "Success", onlineClassResponseDTO));

	}

	@ApiOperation(value = "온라인 수업 삭제")
	@DeleteMapping("/{classId}")
	public ResponseEntity<? extends BaseResponseDto> deleteClass(
			@ApiParam(value = "수업 코드") @PathVariable UUID classId,
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {

		System.out.println("OnlineClassController deleteClass : " + classId);

		int result = onlineClassService.deleteClass(classId, accessToken);

		if (result == 0)
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));

		return ResponseEntity.ok(BaseResponseDto.of(200, "Success"));

	}

}
