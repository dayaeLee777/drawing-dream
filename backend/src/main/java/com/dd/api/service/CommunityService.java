package com.dd.api.service;

import com.dd.api.dto.request.CommunityRegistPostReq;

public interface CommunityService {

	void writeArticle(String accessToken, CommunityRegistPostReq communityRegistPostReq);
	
}
