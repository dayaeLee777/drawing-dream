package com.dd.api.dto.response;

import java.time.LocalDate;
import java.util.UUID;

import com.dd.db.enums.Code;

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
@ApiModel("AttendanceListGetRes")
public class AttendanceListResponseDto {
	
	@ApiModelProperty(name="출석 uuid", example="00000000-0000-0000-0000-00000000")
	UUID attendanceId;
	
	@ApiModelProperty(name="유저 uuid", example="00000000-0000-0000-0000-00000000")
	UUID userId;
	
	@ApiModelProperty(name="출석일", example="2022-01-01")
	LocalDate date;
	
	@ApiModelProperty(name="출석상태", example="C02")
	Code attendanceCode;
}
