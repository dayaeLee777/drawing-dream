package com.dd.api.service;

import com.dd.api.dto.request.CommunityRegisterRequestDto;
import com.dd.api.dto.request.CommunityUpdateRequestDto;

public interface CommunityService {

//	void registerCommunity(String accessToken, CommunityRegisterRequestDto communityRegistPostReq);
	void registerCommunity(CommunityRegisterRequestDto communityRegisterRequestDto);
//	void updateCommnunity(String accessToken, CommunityUpdateRequestDto communityUpdateRequestDto);
	void updateCommunity(CommunityUpdateRequestDto communityUpdateRequestDto);
	
	String getLoginIdFromToken(String accessToken);
}
