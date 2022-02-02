package com.dd.api.dto.response;

import java.util.List;

import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@ApiModel("ChatRoomGetListWrapperResponseDTO")
public class ChatRoomGetListWrapperResponseDTO extends BaseResponseDto {

	@ApiModelProperty(name = "채팅방 정보 목록")
	private List<ChatRoomGetListResponseDTO> rooms;

	@Builder
	public ChatRoomGetListWrapperResponseDTO(List<ChatRoomGetListResponseDTO> rooms) {
		this.rooms = rooms;
	}

	public static ChatRoomGetListWrapperResponseDTO of(Integer statusCode, String message,
			ChatRoomGetListWrapperResponseDTO chatRoomGetListWrapperResponseDTO) {
		ChatRoomGetListWrapperResponseDTO res = chatRoomGetListWrapperResponseDTO;
		res.setStatusCode(statusCode);
		res.setMessage(message);

		return res;
	}

}
