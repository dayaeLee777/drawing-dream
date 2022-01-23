package com.dd.api.service;

import javax.servlet.http.HttpServletResponse;

import com.dd.api.dto.request.UserRegistPostReq;

public interface UserService {
	
	void signUp(UserRegistPostReq userRegistPostReq);
}
