package com.dd.api.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("StudyResponseDTO")
public class StudyResponseDTO extends BaseResponseDto {

	@ApiModelProperty("스터디 정보 - studyId")
	private UUID studyId;

	@ApiModelProperty("스터디 정보 - studyName")
	private String studyName;

	@ApiModelProperty("스터디 정보 - hostId")
	private UUID hostId;

	@ApiModelProperty("스터디 정보 - hostName")
	private String hostName;

	@ApiModelProperty("스터디 정보 - 개설일")
	private LocalDateTime regTime;

	public static StudyResponseDTO of(Integer statusCode, String message, StudyResponseDTO studyResponseDTO) {
		StudyResponseDTO res = studyResponseDTO;
		res.setStatusCode(statusCode);
		res.setMessage(message);

		return res;
	}

}
