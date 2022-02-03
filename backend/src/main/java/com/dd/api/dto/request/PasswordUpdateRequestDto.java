package com.dd.api.dto.request;

import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel("PasswordUpdateRequestDto")
public class PasswordUpdateRequestDto {
	
	@ApiModelProperty(name="변경할 비밀번호")
	private String password;
}
