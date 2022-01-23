package com.dd.api.service;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import com.dd.api.dto.request.UserRegistPostReq;
import com.dd.db.repository.UserRepository;

public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public void signUp(UserRegistPostReq userRegistPostReq) {
		
	}

}
