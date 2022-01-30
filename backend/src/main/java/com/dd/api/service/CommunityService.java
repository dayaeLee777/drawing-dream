package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.request.CommunityRegisterRequestDto;
import com.dd.api.dto.request.CommunityUpdateRequestDto;
import com.dd.api.dto.response.CommunityGetListWrapperResponseDto;
import com.dd.api.dto.response.CommunityGetResponseDto;
import com.dd.db.entity.board.Community;

public interface CommunityService {

//	void registerCommunity(String accessToken, CommunityRegisterRequestDto communityRegistPostReq);
	void registerCommunity(CommunityRegisterRequestDto communityRegisterRequestDto);
//	boolean updateCommnunity(String accessToken, CommunityUpdateRequestDto communityUpdateRequestDto);
	boolean updateCommunity(CommunityUpdateRequestDto communityUpdateRequestDto);
	void plusCommunityHit(Community community);
//	Community getCommunity(String accessToken, UUID communityID);
	CommunityGetResponseDto getCommunity(UUID communityId);
//	CommunityGetListWrapperResponseDto getCommunityList(String accessToken);
	CommunityGetListWrapperResponseDto getCommunityList();
//	boolean deleteCommunity(String accessToken, UUID communityId);
	boolean deleteCommunity(UUID communityId);
	
	String getLoginIdFromToken(String accessToken);
}
