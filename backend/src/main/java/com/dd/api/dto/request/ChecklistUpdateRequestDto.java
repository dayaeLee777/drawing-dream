package com.dd.api.dto.request;

import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel("memoUpdateRequestDto")
public class ChecklistUpdateRequestDto {
	
	@ApiModelProperty(name="수정할 메모ID", example="00000000-0000-0000-0000-00000000")
	private UUID memoId;
	
	@ApiModelProperty(name="수정할 메모 내용", example="수정할 메모를 작성하세요")
	private String content;
}
