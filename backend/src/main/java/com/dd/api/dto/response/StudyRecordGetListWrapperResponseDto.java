package com.dd.api.dto.response;

import java.time.LocalTime;
import java.util.List;

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
@ApiModel("studyRecordGetListWrapperResponseDto")
public class StudyRecordGetListWrapperResponseDto {
	
	@ApiModelProperty(name = "오늘의공부시간 리스트")
	private List<StudyRecordResponseDto> studyRecordResponseDtoList;

	@ApiModelProperty(name="오늘 총 공부시간", example="00:00")
	private LocalTime totalStudyRecord;
	
}
