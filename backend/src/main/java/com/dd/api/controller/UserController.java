package com.dd.api.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.request.UserRegistPostReq;
import com.dd.api.service.UserService;
import com.dd.common.model.BaseResponse;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;


@RestController
@CrossOrigin("*")
@Api(value="User API", tags="{user}")
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	UserService userService;
	
	@PostMapping("/signup")
	@ApiOperation(value="유저 회원가입", notes="<strong>아이디와 비밀번호</strong>를 통해 유저 회원가입")
	@ApiResponses({
		@ApiResponse(code=201, message="회원가입이 정상적으로 완료되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="회원가입에 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponse> signUp(
			@ApiIgnore @RequestHeader("Auth") String accessToken,
			@RequestBody @ApiParam(value="회원 가입 - 유저 정보", required=true) UserRegistPostReq userRegistPostReq,
			HttpServletResponse response) {
		userService.signUp(accessToken, userRegistPostReq, response);
		return ResponseEntity.status(201).body(BaseResponse.of(201, "회원가입이 정상적으로 완료되었습니다."));
	}
	
}
