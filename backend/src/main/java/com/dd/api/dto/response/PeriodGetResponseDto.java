package com.dd.api.dto.response;

import java.time.LocalTime;

import com.dd.db.enums.Code;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@ApiModel("periodGetResponseDto")
public class PeriodGetResponseDto {
	
	@ApiModelProperty(name="교시", example="00000000-0000-0000-0000-00000000")
	Code periodCode;
	
	@ApiModelProperty(name="시작시간", example="09:00:00")
	LocalTime startTime;
	
	@ApiModelProperty(name="종료시간", example="09:45:00")
	LocalTime endTime;
	
}
