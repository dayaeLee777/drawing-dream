package com.dd.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel("studyRecordRegistRequestDto")
public class StudyRecordRegistRequestDto {
	
	@ApiModelProperty(name="공부기록 제목", example="영어 5단원 복습")
	private String title;

}
