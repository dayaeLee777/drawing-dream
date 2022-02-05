package com.dd.api.dto.request;

import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel("studyRecordUpdateRequestDto")
public class StudyRecordUpdateRequestDto {
	
	@ApiModelProperty(name="수정할 공부기록ID", example="00000000-0000-0000-0000-00000000")
	private UUID studyRecordId;
	
	@ApiModelProperty(name="공부기록 제목", example="영어 5단원 복습")
	private String title;

}
