package com.dd.api.request.schoollife.attendance;

import java.util.Date;
import java.util.UUID;

import com.dd.db.enums.Code;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
/**
 * 출석 삭제 API ([PUT] /api/attendance/delete) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("AttendanceDelPutReq")
public class AttendanceDelPutReq {
	@ApiModelProperty(name="출석을 삭제할 유저의 uuid", example="00000000-0000-0000-0000")
	UUID userId;
	
	@ApiModelProperty(name="삭제할 출석일", example="2022-01-01")
	Date date;
}
