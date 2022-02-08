package com.dd.api.service;

import com.dd.api.dto.response.ScoreGetWrapperResponseDto;

public interface ScoreService {

	String getLoginIdFromToken(String accessToken);

	ScoreGetWrapperResponseDto getScoreList(String accessToken);

}
