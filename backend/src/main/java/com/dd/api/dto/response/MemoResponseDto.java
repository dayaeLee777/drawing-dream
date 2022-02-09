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
@ApiModel("memoResponseDto")
public class MemoResponseDto {
	
	@ApiModelProperty(name="메모Id", example="00000000-0000-0000-0000-00000000")
	UUID memoId;
	
	@ApiModelProperty(name="내용", example="메모 내용입니다.")
	String content;
	
	@ApiModelProperty(name="등록일시", example="2022-01-27 10:08:12")
	String regTime;
	
}
