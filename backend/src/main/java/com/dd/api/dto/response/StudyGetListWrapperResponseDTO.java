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
@ApiModel("StudyGetListWrapperResponseDTO")
public class StudyGetListWrapperResponseDTO extends BaseResponseDto {

	@ApiModelProperty("스터디 목록")
	private List<StudyGetListResponseDTO> studyGetListResponseDTOs;

	@Builder
	public StudyGetListWrapperResponseDTO(List<StudyGetListResponseDTO> studyGetListResponseDTOs) {
		this.studyGetListResponseDTOs = studyGetListResponseDTOs;
	}

	public static StudyGetListWrapperResponseDTO of(Integer statusCode, String message,
			StudyGetListWrapperResponseDTO studyGetListWrapperResponseDTO) {
		StudyGetListWrapperResponseDTO res = studyGetListWrapperResponseDTO;
		res.setStatusCode(statusCode);
		res.setMessage(message);

		return res;
	}

}
