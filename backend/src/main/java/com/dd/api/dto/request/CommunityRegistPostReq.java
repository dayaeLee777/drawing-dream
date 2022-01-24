package com.dd.api.dto.request;

import java.util.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@ApiModel("CommunityRegistPostReq")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CommunityRegistPostReq {
	
	@ApiModelProperty(name="게시글 정보 - 제목")
	private String title;
	
	@ApiModelProperty(name="게시글 정보 - 내용")
	private String content;
	
}
