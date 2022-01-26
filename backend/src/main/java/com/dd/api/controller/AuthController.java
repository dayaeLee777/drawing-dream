package com.dd.api.controller;

import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.AuthLoginRequestDto;
import com.dd.api.service.UserService;
import com.dd.security.util.JwtAuthenticationProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;

@RestController
@Api(value="Auth API", tags="{auth}")
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtAuthenticationProvider jwtAuthenticationProvider;
	
	@Autowired
	UserService userService;

	@PostMapping("/login")
	public ResponseEntity<UUID> login(HttpServletResponse response, @RequestBody @ApiParam(value="인증 정보") AuthLoginRequestDto authLoginPostReq) {
		String loginId = authLoginPostReq.getLoginId();
		String password = authLoginPostReq.getPassword();
		System.out.println("@@ Login 요청  :  " + authLoginPostReq.getLoginId());

		// 로그인 ID, PW 기반으로 AutenticationToken 을 생성하여 검증 (사용자 비밀번호 체크)
		// authenticate 메소드가 실행될 때 UserDetailsServiceImpl 의 loadUserByUsername 메소드가 실행됨
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginId, password));

		System.out.println("authentication: " + authentication.toString());

		// 인증 정보를 기반으로 JWT 생성
		String jwt = jwtAuthenticationProvider.createToken(authentication);
		
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add(JwtAuthenticationProvider.AUTHORIZATION_HEADER, JwtAuthenticationProvider.BEARER_PREFIX + jwt);
		
		
		
		return new ResponseEntity<>(userService.getUserId(loginId), httpHeaders, HttpStatus.OK);
	}

}
