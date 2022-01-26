package com.dd.api.controller;

import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.request.UserRegisterRequestDto;
import com.dd.api.dto.request.UserUpdateRequestDto;
import com.dd.api.dto.response.UserInfoResponseDto;
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
@Api(value="User API")
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
			@RequestBody @ApiParam(value="회원 가입 - 유저 정보", required=true) UserRegisterRequestDto userRegisterRequestDto) {
		userService.signUp(userRegisterRequestDto);
		return ResponseEntity.status(201).body(BaseResponse.of(201, "회원가입이 정상적으로 완료되었습니다."));
	}
	
	@PutMapping()
	@ApiOperation(value="유저 회원정보 수정")
	@ApiResponses({
		@ApiResponse(code=200, message="회원정보가 정상적으로 수정되었습니다."),
		@ApiResponse(code=404, message="회원정보가 존재하지 않습니다."),
	})
	public ResponseEntity<? extends BaseResponse> updateUser(
//			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@RequestBody @ApiParam(value="유저 수정 정보", required=true) UserUpdateRequestDto userUpdateRequestDto) {
//		userService.updateUser(accessToken, userUpdateRequestDto);
//		userService.updateUser(userUpdateRequestDto);
		return ResponseEntity.status(200).body(BaseResponse.of(200, "회원정보가 정상적으로 수정되었습니다."));
	}
	
	@PutMapping("/delete/{userId}")
	@ApiOperation(value="유저 탈퇴")
	@ApiResponses({
		@ApiResponse(code=200, message="회원정보가 정상적으로 삭제되었습니다."),
		@ApiResponse(code=404, message="회원정보가 존재하지 않습니다."),
	})
	public ResponseEntity<? extends BaseResponse> deleteUser(
//			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@PathVariable("userId") @ApiParam(value="삭제하려는 회원의 userId", required=true) UUID userId) {
//		userService.deleteUser(accessToken, userId);
//		userService.deleteUser(userId);
		return ResponseEntity.status(200).body(BaseResponse.of(200, "회원정보가 정상적으로 삭제되었습니다."));
	}
	
	@GetMapping("{userId}")
	@ApiOperation(value="회원 정보 불러오기")
	@ApiResponses({
		@ApiResponse(code=200, message="회원 정보를 정상적으로 불러왔습니다."),
		@ApiResponse(code=409, message="회원 정보를 불러오지 못했습니다."),
	})
	public ResponseEntity<? extends BaseResponse> getUserInfo(
//			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@PathVariable("userId") @ApiParam(value="회원 정보 가져오려는 회원의 userId", required=true) UUID userId) {
		UserInfoResponseDto userInfoResponseDto = null;
		try {
//			userInfoRes = userService.getUserInfo(accessToken, userId);
			userInfoResponseDto = userService.getUserInfo(userId);
		} catch(NoSuchElementException e) {
			return ResponseEntity.status(409).body(BaseResponse.of(200, "회원정보를 불러오지 못했습니다."));
		}
		
		return ResponseEntity.status(200).body(UserInfoResponseDto.of(200, "회원 정보를 정상적으로 불러왔습니다", userInfoResponseDto));
	}
	
}
