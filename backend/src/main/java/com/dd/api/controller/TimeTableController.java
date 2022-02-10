package com.dd.api.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.TimeTableRegisterRequestDTO;
import com.dd.api.dto.request.TimeTableUpdateRequestDTO;
import com.dd.api.dto.response.TimeTableGetListWrapperResponseDTO;
import com.dd.api.dto.response.TimeTableResponseDTO;
import com.dd.api.service.TimeTableService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "TimeTable API", tags = { "TimeTable" })
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/timetable")
public class TimeTableController {

	private final TimeTableService timeTableService;

	@ApiOperation("전체 시간표 조회")
	@ApiResponses({ @ApiResponse(code = 201, message = "전체 시간표가 조회되었습니다."),
			@ApiResponse(code = 401, message = "인증되지 않은 사용자 입니다."),
			@ApiResponse(code = 409, message = "전체 시간표 조회에 실패했습니다.") })
	@GetMapping
	public ResponseEntity<? extends BaseResponseDto> getTimeTable() {

		TimeTableGetListWrapperResponseDTO timeTableGetListWrapperResponseDTO = timeTableService.getAll();

		return ResponseEntity
				.ok(TimeTableGetListWrapperResponseDTO.of(200, "Success", timeTableGetListWrapperResponseDTO));
	}

	@ApiOperation("시간표 등록")
	@ApiResponses({ @ApiResponse(code = 201, message = "시간표가 등록되었습니다."),
			@ApiResponse(code = 401, message = "인증되지 않은 사용자 입니다."),
			@ApiResponse(code = 409, message = "시간표 등록에 실패했습니다.") })
	@PostMapping
	public ResponseEntity<? extends BaseResponseDto> registerTimeTable(
			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@RequestBody TimeTableRegisterRequestDTO timeTableRegisterRequestDTO) {

		if (timeTableService.register(accessToken, timeTableRegisterRequestDTO) == null)
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));

		return ResponseEntity.status(201).body(BaseResponseDto.of(201, "Success"));

	}

	@ApiOperation("시간표 일부 조회")
	@ApiResponses({ @ApiResponse(code = 201, message = "시간표가 조회되었습니다."),
			@ApiResponse(code = 401, message = "인증되지 않은 사용자 입니다."),
			@ApiResponse(code = 409, message = "시간표 조회에 실패했습니다.") })
	@GetMapping("/{timeTableId}")
	public ResponseEntity<? extends BaseResponseDto> getTimeTableOne(@PathVariable UUID timeTableId) {

		TimeTableResponseDTO timeTableResponseDTO = timeTableService.get(timeTableId);

		if (timeTableResponseDTO == null)
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));

		return ResponseEntity.ok(TimeTableResponseDTO.of(200, "Success", timeTableResponseDTO));

	}

	@ApiOperation("시간표 수정")
	@ApiResponses({ @ApiResponse(code = 201, message = "시간표가 수정되었습니다."),
			@ApiResponse(code = 401, message = "인증되지 않은 사용자 입니다."),
			@ApiResponse(code = 409, message = "시간표 수정에 실패했습니다.") })
	@PutMapping
	public ResponseEntity<? extends BaseResponseDto> modifyTimeTable(
			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@RequestBody TimeTableUpdateRequestDTO timeTableUpdateRequestDTO) {

		if (timeTableService.modify(accessToken, timeTableUpdateRequestDTO) == null)
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));

		return ResponseEntity.ok(BaseResponseDto.of(200, "Success"));

	}

	@ApiOperation("시간표 삭제")
	@ApiResponses({ @ApiResponse(code = 201, message = "시간표가 삭제되었습니다."),
			@ApiResponse(code = 401, message = "인증되지 않은 사용자 입니다."),
			@ApiResponse(code = 409, message = "시간표 삭제에 실패했습니다.") })
	@DeleteMapping("/{timeTableId}")
	public ResponseEntity<? extends BaseResponseDto> deleteTimeTable(
			@ApiIgnore @RequestHeader("Authorization") String accessToken, @PathVariable UUID timeTableId) {

		if (timeTableService.delete(accessToken, timeTableId) == null)
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "Fail"));

		return ResponseEntity.ok(BaseResponseDto.of(200, "Success"));

	}

}
