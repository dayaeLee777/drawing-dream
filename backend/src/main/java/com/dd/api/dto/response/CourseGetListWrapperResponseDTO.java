package com.dd.api.dto.response;

import java.util.List;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@ApiModel("CourseGetListWrapperResponseDTO")
public class CourseGetListWrapperResponseDTO extends BaseResponseDto {

	@ApiModelProperty(name = "수업 정보 - 수업 목록")
	List<CourseGetListResponseDTO> courseGetListResponseDTOs;

	@Builder
	public CourseGetListWrapperResponseDTO(List<CourseGetListResponseDTO> courseGetListResponseDTOs) {
		super();
		this.courseGetListResponseDTOs = courseGetListResponseDTOs;
	}

	public static CourseGetListWrapperResponseDTO of(Integer statusCode, String message,
			CourseGetListWrapperResponseDTO courseGetListResponseDTOs) {
		CourseGetListWrapperResponseDTO res = courseGetListResponseDTOs;
		res.setStatusCode(statusCode);
		res.setMessage(message);

		return res;
	}

}
