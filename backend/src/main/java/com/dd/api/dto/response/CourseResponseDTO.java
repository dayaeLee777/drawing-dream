package com.dd.api.dto.response;

import java.util.UUID;

import com.dd.common.model.BaseResponseDto;
import com.dd.db.enums.SubCode;

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
@ApiModel("CourseResponseDTO")
public class CourseResponseDTO extends BaseResponseDto {

	@ApiModelProperty(name = "수업 정보 - 수업 ID")
	UUID courseId;
	@ApiModelProperty(name = "수업 정보 - 온라인 수업 ID")
	UUID onlineClassId;
	
	@ApiModelProperty(name = "수업 정보 - 담당 교사 이름")
	String teacherName;
	@ApiModelProperty(name = "수업 정보 - 과목 코드")
	SubCode courseCode;

	public static CourseResponseDTO of(Integer statusCode, String message, CourseResponseDTO courseResponseDTO) {
		CourseResponseDTO res = courseResponseDTO;
		res.setStatusCode(statusCode);
		res.setMessage(message);

		return res;
	}
}
