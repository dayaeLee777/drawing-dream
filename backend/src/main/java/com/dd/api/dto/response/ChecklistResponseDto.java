package com.dd.api.dto.response;

import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@ApiModel("checklistResponseDto")
public class ChecklistResponseDto {
	
	@ApiModelProperty(name="체크리스트 Id", example="00000000-0000-0000-0000-00000000")
	UUID cheklistId;
	
	@ApiModelProperty(name="내용", example="메모 내용입니다.")
	String content;
	
	@ApiModelProperty(name="체크리스트 완료여부", example="true")
	boolean isChecked;
	
}
