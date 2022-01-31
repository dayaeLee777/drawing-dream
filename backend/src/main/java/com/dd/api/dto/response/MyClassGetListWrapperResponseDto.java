package com.dd.api.dto.response;

import java.util.List;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("MyClassGetListWrapperResponseDto")
public class MyClassGetListWrapperResponseDto extends BaseResponseDto {
	
	@ApiModelProperty(name="우리 반 보기 - 회원 리스트")
	private List<MyClassGetListResponseDto> myClassGetListResponseDtoList;
	
	@Builder
	public MyClassGetListWrapperResponseDto(List<MyClassGetListResponseDto> myClassGetListResponseDtoList) {
		this.myClassGetListResponseDtoList = myClassGetListResponseDtoList;
	}
	
	public static MyClassGetListWrapperResponseDto of(Integer statusCode, String message, MyClassGetListWrapperResponseDto myClassGetListWrapperResponseDto) {
		MyClassGetListWrapperResponseDto res = myClassGetListWrapperResponseDto;
		res.setStatusCode(statusCode);
		res.setMessage(message);
		
		return res;
	}
}
