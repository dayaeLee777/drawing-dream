package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.request.CommentRegisterRequestDto;
import com.dd.api.dto.request.CommentUpdateRequestDto;
import com.dd.api.dto.response.CommentGetListWrapperResponseDto;

public interface CommentService {

	void registerComment(String accessToken, CommentRegisterRequestDto commentRegisterRequestDto);
	CommentGetListWrapperResponseDto getCommentList(UUID communityId);
	boolean updateComment(String accessToken, CommentUpdateRequestDto commentUpdateRequestDto);
	boolean deleteComment(String accessToken, UUID commentId);

	String getLoginIdFromToken(String accessToken);



}
