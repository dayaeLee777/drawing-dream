package com.dd.api.dto.response;

import java.util.UUID;

import com.dd.common.model.BaseResponseDto;
import com.dd.db.enums.Code;
import com.dd.db.enums.SubCode;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ApiModel("TimeTableResponseDTO")
@Getter
@ToString
public class TimeTableResponseDTO extends BaseResponseDto {

	@ApiModelProperty("시간표 정보 - 시간표 ID")
	private UUID timeTableId;

	@ApiModelProperty("시간표 정보 - 요일 코드")
	private Code dayCode;

	@ApiModelProperty("시간표 정보 - 교시 코드")
	private Code periodCode;

	@ApiModelProperty("시간표 정보 - 학기 코드")
	private Code semesterCode;

	@ApiModelProperty("시간표 정보 - 수업 ID")
	private UUID courseId;

	@ApiModelProperty("시간표 정보 - 수업 코드")
	private SubCode courseCode;

	@Builder
	public TimeTableResponseDTO(UUID timeTableId, Code dayCode, Code periodCode, Code semesterCode, UUID courseId,
			SubCode courseCode) {
		this.timeTableId = timeTableId;
		this.dayCode = dayCode;
		this.periodCode = periodCode;
		this.semesterCode = semesterCode;
		this.courseId = courseId;
		this.courseCode = courseCode;
	}

	public static TimeTableResponseDTO of(Integer statusCode, String message,
			TimeTableResponseDTO timeTableResponseDTO) {
		TimeTableResponseDTO res = timeTableResponseDTO;
		res.setStatusCode(statusCode);
		res.setMessage(message);

		return res;
	}

}
