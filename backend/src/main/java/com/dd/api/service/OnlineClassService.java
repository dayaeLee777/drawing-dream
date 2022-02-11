package com.dd.api.service;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.dd.api.dto.request.OnlineClassRegisterRequestDTO;
import com.dd.api.dto.response.OnlineClassInfoGetResponseDto;
import com.dd.api.dto.response.OnlineClassResponseDTO;

public interface OnlineClassService {

	int deleteClass(UUID classId, String accessToken);

	String getLoginIdFromToken(String accessToken);

	OnlineClassResponseDTO createClass(List<MultipartFile> multipartFile,
			OnlineClassRegisterRequestDTO onlineClassRegisterRequestDTO, String accessToken);

	OnlineClassInfoGetResponseDto getOnlineClassInfo(String accessToken, UUID courseId);

}
