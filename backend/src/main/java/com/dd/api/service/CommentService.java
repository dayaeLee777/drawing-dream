package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.request.CommentRegisterRequestDto;
import com.dd.api.dto.response.CommentGetListWrapperResponseDto;

public interface CommentService {

	void registerComment(CommentRegisterRequestDto commentRegisterRequestDto);
	
//	CommentGetListWrapperResponseDto getCommentList(String accessToken, UUID communityId);
	CommentGetListWrapperResponseDto getCommentList(UUID communityId);

}
