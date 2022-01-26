package com.dd.api.request.schoollife.attendance;

import java.util.Date;
import java.util.UUID;

import com.dd.db.enums.Code;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
/**
 * 출석 수정 API ([PUT] /api/attendance) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("AttendanceUpdatePutReq")
public class AttendanceUpdatePutReq {
	
	@ApiModelProperty(name="변경할 유저 uuid", example="00000000-0000-0000-0000-00000000")
	UUID userId;
	
	@ApiModelProperty(name="변경할 출석일", example="2022-01-01")
	Date date;
	
	@ApiModelProperty(name="변경할 출석상태", example="C02")
	Code attendanceCode;
}
