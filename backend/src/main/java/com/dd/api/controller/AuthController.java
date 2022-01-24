package com.dd.api.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.db.entity.user.Auth;
import com.dd.db.repository.AuthRepository;
import com.dd.security.util.JwtAuthenticationProvider;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtAuthenticationProvider jwtAuthenticationProvider;

	@PostMapping("/login")
	public ResponseEntity<String> login(HttpServletResponse response, @RequestBody Auth auth) {

		System.out.println("!!!!!!!!!!!!! " + auth.getLoginId() + " , " + auth.getPassword());

		// 로그인 ID, PW 기반으로 AutenticationToken 을 생성하여 검증 (사용자 비밀번호 체크)
		// authenticate 메소드가 실행될 때 UserDetailsServiceImpl 의 loadUserByUsername 메소드가 실행됨
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(auth.getLoginId(), auth.getPassword()));

		System.out.println("authentication: " + authentication.toString());

		// 인증 정보를 기반으로 JWT 생성
		String jwt = jwtAuthenticationProvider.createToken(authentication);
		
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add(JwtAuthenticationProvider.AUTHORIZATION_HEADER, JwtAuthenticationProvider.BEARER_PREFIX + jwt);

		return new ResponseEntity<>(jwt, httpHeaders, HttpStatus.OK);

	}

}
