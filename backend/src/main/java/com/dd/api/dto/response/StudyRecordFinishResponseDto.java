package com.dd.api.dto.response;

import java.time.LocalTime;

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
public class StudyRecordFinishResponseDto {
	
	@ApiModelProperty(name="공부기록 제목", example="영어 5단원 복습")
	private String title;

	@ApiModelProperty(name="공부 지속 시간", example="01:30")
	private LocalTime durationTime;
	
}
