package com.dd.api.dto.response;

import java.util.List;
import java.util.Map;

import com.dd.common.model.BaseResponseDto;
import com.dd.db.entity.user.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("OnlineClassInfoGetResponseDto")
public class OnlineClassInfoGetResponseDto extends BaseResponseDto {
	
	@ApiModelProperty(name="수업 자료", example="orginFile, 파일 URL")
	private Map<String, String> files;
	
	@ApiModelProperty(name="온라인 클래스 생성 여부")
	private boolean isOnlineClassExists;
	
	@Builder
	public OnlineClassInfoGetResponseDto(Map<String, String> files, boolean isOnlineClassExists) {
		this.files = files;
		this.isOnlineClassExists = isOnlineClassExists;
	}
	
	public static OnlineClassInfoGetResponseDto of(Integer statusCode, String message, OnlineClassInfoGetResponseDto onlineClassInfoGetResponseDto) {
		OnlineClassInfoGetResponseDto res = onlineClassInfoGetResponseDto;
		res.setStatusCode(statusCode);
		res.setMessage(message);
		
		return res;
	}
}
