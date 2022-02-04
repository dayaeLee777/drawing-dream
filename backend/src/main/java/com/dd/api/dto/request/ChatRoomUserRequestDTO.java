package com.dd.api.dto.request;

import java.util.UUID;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@ApiModel("ChatRoomUserRequestDTO")
public class ChatRoomUserRequestDTO {

	@ApiModelProperty(name = "회원 정보 - userId")
	private UUID userId;

	@Builder
	public ChatRoomUserRequestDTO(UUID userId) {
		this.userId = userId;
	}

}
