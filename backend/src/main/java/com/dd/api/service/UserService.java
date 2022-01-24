package com.dd.api.service;

import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import com.dd.api.dto.request.UserRegistPostReq;
import com.dd.api.dto.request.UserUpdatePutReq;

public interface UserService {
	
	void signUp(UserRegistPostReq userRegistPostReq);
	UUID getUserId(String loginId);
	void deleteUser(String accessToken, UUID userId);
	void updateUser(String accessToken, UserUpdatePutReq userUpdatePutReq);
	
}
