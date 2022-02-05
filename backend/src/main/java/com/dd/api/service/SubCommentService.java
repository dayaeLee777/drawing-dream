package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.request.CommentUpdateRequestDto;
import com.dd.api.dto.request.SubCommentRegisterRequestDto;
import com.dd.api.dto.response.SubCommentGetListWrapperResponseDto;

public interface SubCommentService {

	void registerSubComment(String accessToken, SubCommentRegisterRequestDto subCommentRegisterRequestDto);
	SubCommentGetListWrapperResponseDto getSubCommentList(UUID commentId);
	boolean updateSubComment(String accessToken, CommentUpdateRequestDto commentUpdateRequestDto);
	boolean deleteSubComment(String accessToken, UUID commentId);
	String getLoginIdFromToken(String accessToken);

}
