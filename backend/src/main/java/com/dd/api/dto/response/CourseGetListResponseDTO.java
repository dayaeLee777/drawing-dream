package com.dd.api.dto.response;

import java.util.UUID;

import com.dd.db.enums.SubCode;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@ApiModel("CourseResponseDTO")
public class CourseGetListResponseDTO {

	@ApiModelProperty(name = "수업 정보 - 수업 ID")
	UUID courseId;

	@ApiModelProperty(name = "수업 정보 - 과목 코드")
	SubCode subjectCode;

	@ApiModelProperty(name = "수업 정보 - 선생님 이름")
	String teacherName;

	@Builder
	public CourseGetListResponseDTO(UUID courseId, SubCode subjectCode, String teacherName) {
		super();
		this.courseId = courseId;
		this.subjectCode = subjectCode;
		this.teacherName = teacherName;
	}

}
