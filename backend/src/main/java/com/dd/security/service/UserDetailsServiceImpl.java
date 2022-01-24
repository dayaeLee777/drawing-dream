package com.dd.security.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dd.db.entity.user.Auth;
import com.dd.db.repository.AuthRepository;

// 인증에 필요한 UserDetailsService Interface 의 loadUserByUsername 메서드를 구현하는 클래스로
// loadUserByUsername 메서드를 통해 Database 에 접근하여 사용자 정보를 가지고 옴
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private AuthRepository authRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<Auth> oAuth = authRepository.findByLoginId(username);

		return new UserDetailsImpl(oAuth.orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다.")));

	}

}
