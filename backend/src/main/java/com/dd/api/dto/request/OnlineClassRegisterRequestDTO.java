package com.dd.api.dto.request;

import java.util.UUID;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@ApiModel("OnlineClassRegisterRequestDTO")
public class OnlineClassRegisterRequestDTO {

	private UUID courseId;

}
