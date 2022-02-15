package com.dd.api.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@ApiModel("StudyGetListResponseDTO")
public class StudyGetListResponseDTO {

	@ApiModelProperty("스터디 정보 - studyId")
	private UUID studyId;

	@ApiModelProperty("스터디 정보 - studyName")
	private String studyName;

	@ApiModelProperty("스터디 정보 - hostId")
	private UUID hostId;

	@ApiModelProperty("스터디 정보 - hostName")
	private String hostName;

	@ApiModelProperty("스터디 정보 - 개설일")
	private LocalDateTime regTime;

	@Builder
	public StudyGetListResponseDTO(UUID studyId, String studyName, UUID hostId, String hostName,
			LocalDateTime regTime) {
		this.studyId = studyId;
		this.studyName = studyName;
		this.hostId = hostId;
		this.hostName = hostName;
		this.regTime = regTime;
	}

}
