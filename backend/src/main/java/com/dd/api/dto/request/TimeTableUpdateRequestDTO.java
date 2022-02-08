package com.dd.api.dto.request;

import java.util.UUID;

import com.dd.db.enums.Code;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ApiModel("TimeTableUpdateRequestDTO")
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TimeTableUpdateRequestDTO {

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

}
