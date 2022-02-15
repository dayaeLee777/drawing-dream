package com.dd.api.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@ApiModel("StudyRequestDTO")
public class StudyRequestDTO {

	private String studyName;

}
