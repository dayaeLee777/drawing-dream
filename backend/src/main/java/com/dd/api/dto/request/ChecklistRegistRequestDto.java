package com.dd.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel("checklistRegistRequestDto")
public class ChecklistRegistRequestDto {

	@ApiModelProperty(name="체크리스트 내용", example="체크리스트 내용입니다~~")
	private String content;
	
}
