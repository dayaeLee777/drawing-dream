package com.dd.api.service;

import com.dd.api.dto.response.MyClassGetListWrapperResponseDto;

public interface MyClassService {

	MyClassGetListWrapperResponseDto getMyClassList(String accessToken);
//	MyClassGetListWrapperResponseDto getMyClassList();
	
	String getLoginIdFromToken(String accessToken);

}
