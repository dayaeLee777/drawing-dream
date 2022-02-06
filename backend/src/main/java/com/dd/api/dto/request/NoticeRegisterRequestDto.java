package com.dd.api.dto.request;

import java.util.List;

import javax.persistence.Lob;

import org.springframework.web.multipart.MultipartFile;

import com.dd.db.enums.Code;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel("noticeRegisterRequestDto")
public class NoticeRegisterRequestDto {
	
	@ApiModelProperty(name="알림장 제목", example = "기말고사 일정 안내")
	private String title;
	
	@Lob
	@ApiModelProperty(name="알림장 내용", example = "2022년 1학기 기말고사 일정 안내입니다.")
	private String content;

	@ApiModelProperty(name="알림장 코드", example = "전체-K01, 학년-K02, 반-K03")
	private Code noticeCode;
	
//	@ApiModelProperty(name="알림장 첨부파일")
//	private List<MultipartFile> multipartFile;
	
}
