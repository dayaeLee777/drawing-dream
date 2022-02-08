package com.dd.api.dto.response;

import java.util.List;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("ScoreGetWrapperResponseDto")
public class ScoreGetWrapperResponseDto extends BaseResponseDto {
	
	@ApiModelProperty(name="성적 리스트")
	private List<ScoreGetResponseDto> scoreGetResponseDtoList;
	
	@Builder
	public ScoreGetWrapperResponseDto(List<ScoreGetResponseDto> scoreGetResponseDtoList) {
		this.scoreGetResponseDtoList = scoreGetResponseDtoList;
	}
	
	public static ScoreGetWrapperResponseDto of(Integer statusCode, String message, ScoreGetWrapperResponseDto scoreGetWrapperResponseDto) {
		ScoreGetWrapperResponseDto res = scoreGetWrapperResponseDto;
		res.setStatusCode(statusCode);
		res.setMessage(message);
		
		return res;
	}
}
