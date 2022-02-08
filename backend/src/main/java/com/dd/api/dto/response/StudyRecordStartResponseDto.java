package com.dd.api.dto.response;

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
@ApiModel("studyRecordStartResponseDto")
public class StudyRecordStartResponseDto {
	
	@ApiModelProperty(name = "오늘의공부시간 uuid", example = "00000000-0000-0000-0000-00000000")
	UUID studyRecordId;

}
