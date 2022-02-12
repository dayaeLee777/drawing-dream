package com.dd.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel("PasswordCheckRequestDTO")
public class PasswordCheckRequestDTO {

	@ApiModelProperty(name = "현재 비밀번호")
	private String password;

}
