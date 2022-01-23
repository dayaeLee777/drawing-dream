package com.dd.api.service;

import javax.servlet.http.HttpServletResponse;

import com.dd.api.request.UserRegistPostReq;

public interface UserService {
	
	void signUp(String accessToken, UserRegistPostReq userRegistPostReq, HttpServletResponse response);
}
