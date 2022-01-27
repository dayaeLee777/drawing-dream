package com.dd.api.service;

import org.springframework.stereotype.Service;

import com.dd.db.entity.user.User;
import com.dd.db.repository.AuthRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Service("jwtTokenService")
@RequiredArgsConstructor
public class JwtTokenServiceImpl implements JwtTokenService {

	private final JwtAuthenticationProvider jwtAuthenticationProvider;

	private final AuthRepository authRepository;
	
	@Override
	public User convertTokenToUser(String accessToken) {
		String token = accessToken.split(" ")[1];
		String loginId = jwtAuthenticationProvider.getUsername(token);
		User user = authRepository.findByLoginId(loginId).get().getUser();
		return user;
	}

}
