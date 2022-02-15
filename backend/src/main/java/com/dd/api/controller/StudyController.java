package com.dd.api.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.StudyRequestDTO;
import com.dd.api.dto.response.StudyGetListWrapperResponseDTO;
import com.dd.api.dto.response.StudyResponseDTO;
import com.dd.api.service.StudyService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "스터디 API", tags = { "Study" })
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/study")
public class StudyController {

	private final StudyService studyService;

	@ApiOperation("스터디 생성")
	@PostMapping
	public ResponseEntity<? extends BaseResponseDto> createStudy(
			@ApiParam("스터디 이름") @RequestBody StudyRequestDTO studyRequestDTO,
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {

		StudyResponseDTO studyResponseDTO = studyService.createStudy(studyRequestDTO, accessToken);

		if (studyResponseDTO == null)
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));

		return ResponseEntity.ok(StudyResponseDTO.of(200, "Success", studyResponseDTO));

	}

	@ApiOperation("스터디 조회")
	@GetMapping("/{studyId}")
	public ResponseEntity<? extends BaseResponseDto> getStudy(@ApiParam("스터디 ID") @PathVariable UUID studyId) {

		StudyResponseDTO studyResponseDTO = studyService.getStudy(studyId);
		
		if (studyResponseDTO == null)
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));
		
		return ResponseEntity.ok(StudyResponseDTO.of(200, "Success", studyResponseDTO));

	}

	@ApiOperation("스터디 삭제")
	@PutMapping("/{studyId}")
	public ResponseEntity<? extends BaseResponseDto> deleteStudy(@ApiParam("스터디 ID") @PathVariable UUID studyId,
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {

		int result = studyService.deleteStudy(studyId, accessToken);

		if (result == 0)
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));

		return ResponseEntity.ok(BaseResponseDto.of(200, "Success"));

	}

	@ApiOperation("스터디 목록 조회")
	@GetMapping
	public ResponseEntity<? extends BaseResponseDto> getStudyList() {

		return ResponseEntity.ok(StudyGetListWrapperResponseDTO.of(200, "Success", studyService.getStudyList()));

	}

}
