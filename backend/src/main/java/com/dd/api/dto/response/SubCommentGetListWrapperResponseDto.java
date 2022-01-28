package com.dd.api.dto.response;

import java.util.List;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("SubCommentGetListWrapperResponseDto")
public class SubCommentGetListWrapperResponseDto extends BaseResponseDto {
	
	@ApiModelProperty(name="커뮤니티 - 대댓글 정보 리스트")
	private List<SubCommentGetListResponseDto> subCommentGetListResponseDtoList;
	
	@Builder
	public SubCommentGetListWrapperResponseDto(List<SubCommentGetListResponseDto> subCommentGetListResponseDtoList) {
		this.subCommentGetListResponseDtoList = subCommentGetListResponseDtoList;
	}
	
	public static SubCommentGetListWrapperResponseDto of(Integer statusCode, String message, SubCommentGetListWrapperResponseDto subCommentGetListWrapperResponseDto) {
		SubCommentGetListWrapperResponseDto res = subCommentGetListWrapperResponseDto;
		res.setStatusCode(statusCode);
		res.setMessage(message);
		
		return res;
	}
}
