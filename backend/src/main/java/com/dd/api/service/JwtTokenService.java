package com.dd.api.service;

import com.dd.db.entity.user.User;

public interface JwtTokenService {
	
	User convertTokenToUser(String accessToken);
}
