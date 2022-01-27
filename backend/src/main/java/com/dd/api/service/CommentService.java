package com.dd.api.service;

import com.dd.api.dto.request.CommentRegisterRequestDto;

public interface CommentService {

	void registerComment(CommentRegisterRequestDto commentRegisterRequestDto);

}
