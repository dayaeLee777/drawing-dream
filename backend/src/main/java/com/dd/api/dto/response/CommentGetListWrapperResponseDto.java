package com.dd.api.dto.response;

import java.util.List;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("CommentGetListWrapperResponseDto")
public class CommentGetListWrapperResponseDto extends BaseResponseDto {

	@ApiModelProperty(name="커뮤니티 - 댓글 정보 리스트")
	private List<CommentGetListResponseDto> commentGetListResponseDtoList;
	
	@Builder
	public CommentGetListWrapperResponseDto(List<CommentGetListResponseDto> commentGetListResponseDtoList) {
		this.commentGetListResponseDtoList = commentGetListResponseDtoList;
	}
	
	public static CommentGetListWrapperResponseDto of(Integer statusCode, String message, CommentGetListWrapperResponseDto commentGetListWrapperResponseDto) {
		CommentGetListWrapperResponseDto res = commentGetListWrapperResponseDto;
		res.setStatusCode(statusCode);
		res.setMessage(message);
		
		return res;
	}
}
