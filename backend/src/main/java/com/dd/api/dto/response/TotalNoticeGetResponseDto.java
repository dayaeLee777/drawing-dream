package com.dd.api.dto.response;

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
@ApiModel("totalNoticeGetResponseDto")
public class TotalNoticeGetResponseDto {
	
	@ApiModelProperty(name="알림장 개수")
	private long totalNoticeCount;
	
}
