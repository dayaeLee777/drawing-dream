package com.dd.api.service;

import com.dd.api.dto.request.CommunityRegisterRequestDto;

public interface CommunityService {

	void writeArticle(String accessToken, CommunityRegisterRequestDto communityRegistPostReq);
	
}
