package com.dd.api.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

import com.dd.db.enums.Code;
import com.dd.db.enums.SubCode;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@ApiModel("ScoreGetResponseDto")
public class ScoreGetResponseDto {
	
	@ApiModelProperty(name="성적 정보 - id")
	private UUID scoreId;
	@ApiModelProperty(name="성적 정보 - 학년 코드")
	private Code gradeCode;
	@ApiModelProperty(name="성적 정보 - 학기 코드")
	private Code semesterCode;
	@ApiModelProperty(name="성적 정보 - 시험 코드")
	private SubCode testCode;
	@ApiModelProperty(name="성적 정보 - 과목 코드")
	private SubCode subjectCode;
	@ApiModelProperty(name="성적 정보 - 점수")
	private float score;
	
	@Builder
	public ScoreGetResponseDto(UUID scoreId, Code gradeCode, Code semesterCode, SubCode testCode, SubCode subjectCode, float score) {
		this.scoreId 		= scoreId;
		this.gradeCode 		= gradeCode;
		this.semesterCode 	= semesterCode;
		this.testCode 		= testCode;
		this.subjectCode 	= subjectCode;
		this.score 			= score;
	}
}
