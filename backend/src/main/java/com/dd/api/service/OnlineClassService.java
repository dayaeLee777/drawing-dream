package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.request.OnlineClassRegisterRequestDTO;
import com.dd.api.dto.response.OnlineClassResponseDTO;

public interface OnlineClassService {

	OnlineClassResponseDTO createClass(OnlineClassRegisterRequestDTO onlineClassRegisterRequestDTO, String accessToken);

	int deleteClass(UUID classId, String accessToken);

}
