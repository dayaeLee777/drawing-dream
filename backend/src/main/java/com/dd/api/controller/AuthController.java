package com.dd.api.controller;

import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

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
import com.dd.api.dto.response.AuthLoginResponseDto;
import com.dd.api.dto.response.ProfileResponseDto;
import com.dd.api.service.UserService;
import com.dd.common.model.BaseResponseDto;
import com.dd.security.util.JwtAuthenticationProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@Api(value="Auth API")
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthenticationManager authenticationManager;

	private final JwtAuthenticationProvider jwtAuthenticationProvider;
	
	private final UserService userService;

	@PostMapping("/login")
	@ApiOperation(value="로그인")
	public ResponseEntity<? extends BaseResponseDto> login(
			@RequestBody @ApiParam(value="인증 정보") AuthLoginRequestDto authLoginRequestDto) {
		String loginId = authLoginRequestDto.getLoginId();
		String password = authLoginRequestDto.getPassword();

		// 로그인 ID, PW 기반으로 AutenticationToken 을 생성하여 검증 (사용자 비밀번호 체크)
		// authenticate 메소드가 실행될 때 UserDetailsServiceImpl 의 loadUserByUsername 메소드가 실행됨
		Authentication authentication = null;
		
		try {
			authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginId, password));
		}catch (Exception e) {
			return ResponseEntity.status(401).body(BaseResponseDto.of(401, "로그인에 실패했습니다.")); 
		}

		// 인증 정보를 기반으로 JWT 생성
		String jwt = jwtAuthenticationProvider.createToken(authentication);
		UUID userId = userService.getUserId(loginId);
		
		AuthLoginResponseDto authLoginResponseDto = new AuthLoginResponseDto(userId, jwt);
		
//		HttpHeaders httpHeaders = new HttpHeaders();
//		httpHeaders.add(JwtAuthenticationProvider.AUTHORIZATION_HEADER, JwtAuthenticationProvider.BEARER_PREFIX + jwt);
		
		return ResponseEntity.status(200).body(AuthLoginResponseDto.of(200, "로그인에 성공했습니다.", authLoginResponseDto));
	}

}
