package com.dd.api.dto.request;

import java.time.LocalDate;
import java.util.UUID;

import com.dd.db.enums.Code;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
/**
 * 출석 수정 API ([PUT] /api/attendance) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@NoArgsConstructor
//@AllArgsConstructor
@ApiModel("AttendanceUpdateRequestDto")
public class AttendanceUpdateRequestDto {
	
	@ApiModelProperty(name="변경할 출석 uuid", example="00000000-0000-0000-0000-00000000")
	UUID attendanceId;
	
	@ApiModelProperty(name="변경할 출석일", example="2022-01-01")
	LocalDate date;
	
	@ApiModelProperty(name="변경할 출석상태", example="C02")
	Code attendanceCode;

	@Builder
	public AttendanceUpdateRequestDto(UUID attendanceId, LocalDate date, Code attendanceCode) {
		this.attendanceId = attendanceId;
		this.date = date;
		this.attendanceCode = attendanceCode;
	}
	
	
}
