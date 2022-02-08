package com.dd.api.dto.response;

import java.util.List;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("TimeTableGetListWrapperResponseDTO")
@Getter
@ToString
public class TimeTableGetListWrapperResponseDTO extends BaseResponseDto {

	@ApiModelProperty("시간표 정보 - 전체")
	private List<TimeTableGetListResponseDTO> timeTableGetListResponseDTOs;

	@Builder
	public TimeTableGetListWrapperResponseDTO(List<TimeTableGetListResponseDTO> timeTableGetListResponseDTOs) {
		this.timeTableGetListResponseDTOs = timeTableGetListResponseDTOs;
	}

	public static TimeTableGetListWrapperResponseDTO of(Integer statusCode, String message,
			TimeTableGetListWrapperResponseDTO timeTableGetListWrapperResponseDTO) {
		TimeTableGetListWrapperResponseDTO res = timeTableGetListWrapperResponseDTO;
		res.setStatusCode(statusCode);
		res.setMessage(message);

		return res;
	}

}
