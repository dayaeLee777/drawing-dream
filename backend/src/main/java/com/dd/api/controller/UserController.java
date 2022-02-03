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

import com.dd.api.dto.request.PasswordUpdateRequestDto;
import com.dd.api.dto.request.UserRegisterRequestDto;
import com.dd.api.dto.request.UserUpdateRequestDto;
import com.dd.api.dto.response.UserInfoResponseDto;
import com.dd.api.service.ProfileService;
import com.dd.api.service.UserService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;


@RestController
@CrossOrigin("*")
@Api(value="User API", tags = { "User" })
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
	
	private final UserService userService;
	
	@PostMapping("/signup")
	@ApiOperation(value="유저 회원가입", notes="<strong>아이디와 비밀번호</strong>를 통해 유저 회원가입")
	@ApiResponses({
		@ApiResponse(code=201, message="회원가입이 정상적으로 완료되었습니다."),
		@ApiResponse(code=409, message="회원가입에 실패했습니다.")
	})
	public ResponseEntity<? extends BaseResponseDto> signUp(
			@RequestBody @ApiParam(value="회원 가입 - 유저 정보", required=true) UserRegisterRequestDto userRegisterRequestDto) {
		userService.signUp(userRegisterRequestDto);
		return ResponseEntity.status(201).body(BaseResponseDto.of(201, "회원가입이 정상적으로 완료되었습니다."));
	}
	
	@PutMapping()
	@ApiOperation(value="유저 회원정보 수정")
	@ApiResponses({
		@ApiResponse(code=200, message="회원정보가 정상적으로 수정되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=404, message="회원정보가 존재하지 않습니다."),
	})
	public ResponseEntity<? extends BaseResponseDto> updateUser(
			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@RequestBody @ApiParam(value="유저 수정 정보", required=true) UserUpdateRequestDto userUpdateRequestDto) {
		if(accessToken == null) return ResponseEntity.status(401).body(BaseResponseDto.of(401, "인증되지 않은 사용자입니다."));
		
		userService.updateUser(accessToken, userUpdateRequestDto);
		return ResponseEntity.status(200).body(BaseResponseDto.of(200, "회원정보가 정상적으로 수정되었습니다."));
	}
	
	@PutMapping("/password")
	@ApiOperation(value="비밀번호 수정")
	@ApiResponses({
		@ApiResponse(code=200, message="비밀번호가 정상적으로 수정되었습니다."),
		@ApiResponse(code=202, message="현재와 다른 비밀번호를 사용해주세요."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
	})
	public ResponseEntity<? extends BaseResponseDto> updatePassword(
			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@RequestBody @ApiParam(value="변경할 비밀번호 정보", required=true) PasswordUpdateRequestDto passwordUpdateRequestDto) {
		if(accessToken == null) return ResponseEntity.status(401).body(BaseResponseDto.of(401, "인증되지 않은 사용자입니다."));
		
		if(!userService.updatePassword(accessToken, passwordUpdateRequestDto)) {
			return ResponseEntity.status(202).body(BaseResponseDto.of(202, "현재와 다른 비밀번호를 사용해주세요."));
		}
		return ResponseEntity.status(200).body(BaseResponseDto.of(200, "비밀번호가 정상적으로 수정되었습니다."));
	}
	
	@PutMapping("/delete/{userId}")
	@ApiOperation(value="회원 탈퇴")
	@ApiResponses({
		@ApiResponse(code=200, message="회원정보가 정상적으로 삭제되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=404, message="회원정보가 존재하지 않습니다."),
	})
	public ResponseEntity<? extends BaseResponseDto> deleteUser(
//			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@PathVariable("userId") @ApiParam(value="삭제하려는 회원의 userId", required=true) UUID userId) {
//		if(accessToken == null) return ResponseEntity.status(401).body(BaseResponseDto.of(401, "인증되지 않은 사용자입니다."));
		
//		userService.deleteUser(accessToken, userId);
		userService.deleteUser(userId);
		return ResponseEntity.status(200).body(BaseResponseDto.of(200, "회원정보가 정상적으로 삭제되었습니다."));
	}
	
	@GetMapping("{userId}")
	@ApiOperation(value="회원 정보 불러오기")
	@ApiResponses({
		@ApiResponse(code=200, message="회원 정보를 정상적으로 불러왔습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="회원 정보를 불러오지 못했습니다."),
	})
	public ResponseEntity<? extends BaseResponseDto> getUserInfo(
			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@PathVariable("userId") @ApiParam(value="회원 정보 가져오려는 회원의 userId", required=true) UUID userId) {
		if(accessToken == null) return ResponseEntity.status(401).body(BaseResponseDto.of(200, "인증되지 않은 사용자입니다."));
		
		UserInfoResponseDto userInfoResponseDto = null;
		
		try {
//			userInfoResponseDto = userService.getUserInfo(accessToken, userId);
			userInfoResponseDto = userService.getUserInfo(userId);
		} catch(Exception e) {
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "회원정보를 불러오지 못했습니다."));
		}
		
		return ResponseEntity.status(200).body(UserInfoResponseDto.of(200, "회원 정보를 정상적으로 불러왔습니다", userInfoResponseDto));
	}
	
	@GetMapping("/idCheck/{loginId}")
	@ApiOperation(value="로그인 아이디 중복체크")
	@ApiResponses({
		@ApiResponse(code=200, message="회원 정보가 있습니다."),
		@ApiResponse(code=409, message="회원 정보가 없습니다."),
	})
	public ResponseEntity<? extends BaseResponseDto> idCheck(
			@PathVariable("loginId") @ApiParam(value="중복 체크하려는 loginId", required=true) String loginId) {
		
		if(!userService.checkLoginIdExists(loginId))
			return ResponseEntity.status(200).body(BaseResponseDto.of(200, "해당 loginId는 회원가입 가능합니다."));
		else
			return ResponseEntity.status(409).body(BaseResponseDto.of(409, "해당 loginId은 중복입니다."));
	}
	
}
