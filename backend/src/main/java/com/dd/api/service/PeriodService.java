package com.dd.api.service;

import java.util.List;

import com.dd.api.dto.response.PeriodGetResponseDto;

public interface PeriodService {
	
	List<PeriodGetResponseDto> getPeriodList(String accessToken);
	
}
