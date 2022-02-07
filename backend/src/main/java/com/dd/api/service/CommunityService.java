package com.dd.api.service;

import java.util.UUID;

import org.springframework.data.domain.Pageable;

import com.dd.api.dto.request.CommunityRegisterRequestDto;
import com.dd.api.dto.request.CommunityUpdateRequestDto;
import com.dd.api.dto.response.CommunityGetListWrapperResponseDto;
import com.dd.api.dto.response.CommunityGetResponseDto;
import com.dd.api.dto.response.TotalCommunityGetResponseDto;
import com.dd.db.entity.board.Community;

public interface CommunityService {

	void registerCommunity(String accessToken, CommunityRegisterRequestDto communityRegistPostReq);
	boolean updateCommunity(String accessToken, CommunityUpdateRequestDto communityUpdateRequestDto);
	CommunityGetResponseDto getCommunity(UUID communityId);
	void plusCommunityHit(Community community);
	boolean deleteCommunity(String accessToken, UUID communityId);
	String getLoginIdFromToken(String accessToken);
	TotalCommunityGetResponseDto getTotalCommunity(String accessToken);
	CommunityGetListWrapperResponseDto getCommunityList(String accessToken, Pageable pageable);
}
