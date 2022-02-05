package com.dd.api.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel("studyRecordResponseDto")
public class StudyRecordResponseDto {
	
	@ApiModelProperty(name = "오늘의공부시간 uuid", example = "00000000-0000-0000-0000-00000000")
	UUID studyRecordId;

	@ApiModelProperty(name="공부기록 제목", example="영어 5단원 복습")
	private String title;

	@ApiModelProperty(name="날짜", example="2022-01-01")
	private LocalDate studyDate;
	
	@ApiModelProperty(name="공부 시작시간", example="2022-02-05 00:00:56.599000")
	private LocalDateTime startTime;
	
	@ApiModelProperty(name="공부 종료시간", example="2022-02-05 00:30:56.599000")
	private LocalDateTime endTime;
	
}
