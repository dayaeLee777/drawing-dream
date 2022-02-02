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
@ApiModel("ChatRoomWithMessageResponseDTO")
public class ChatRoomWithMessageResponseDTO extends BaseResponseDto {

	@ApiModelProperty(name = "채팅방 정보 - name")
	String roomName;

	@ApiModelProperty(name = "채팅방 전체 메시지")
	private List<ChatMessageResponseDTO> messages;

	@ApiModelProperty(name = "채팅방 참여 인원")
	private List<ChatRoomUserResponseDTO> users;

	@Builder
	public ChatRoomWithMessageResponseDTO(String roomName, List<ChatMessageResponseDTO> messages,
			List<ChatRoomUserResponseDTO> users) {
		this.roomName = roomName;
		this.messages = messages;
		this.users = users;
	}

	public static ChatRoomWithMessageResponseDTO of(Integer statusCode, String message,
			ChatRoomWithMessageResponseDTO chatRoomWithMessageResponseDTO) {
		ChatRoomWithMessageResponseDTO res = chatRoomWithMessageResponseDTO;
		res.setStatusCode(statusCode);
		res.setMessage(message);

		return res;
	}
}
