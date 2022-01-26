package com.dd.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel("memoRegistRequestDto")
public class MemoRegistRequestDto {

	@ApiModelProperty(name="메모 내용", example="메모입니다~~")
	private String content;
	
}
