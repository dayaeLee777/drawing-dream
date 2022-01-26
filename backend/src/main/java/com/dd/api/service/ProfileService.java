package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.response.ProfileResponseDto;

public interface ProfileService {

	ProfileResponseDto getProfile(UUID userId);

}
