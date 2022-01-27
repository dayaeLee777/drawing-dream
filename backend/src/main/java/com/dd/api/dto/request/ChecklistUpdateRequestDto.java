package com.dd.api.dto.request;

import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel("checklistUpdateRequestDto")
public class ChecklistUpdateRequestDto {
	
	@ApiModelProperty(name="수정할 체크리스트ID", example="00000000-0000-0000-0000-00000000")
	private UUID checklistId;
	
	@ApiModelProperty(name="수정할 체크리스트 내용", example="수정할 체크리스트를 작성하세요")
	private String content;
	
	@ApiModelProperty(name="수정할 체크리스트 완료여부", example="true")
	private boolean checked;
}
