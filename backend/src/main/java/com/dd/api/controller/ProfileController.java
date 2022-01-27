package com.dd.api.controller;

import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.response.ProfileResponseDto;
import com.dd.api.dto.response.UserInfoResponseDto;
import com.dd.api.service.ProfileService;
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
@Api(value="Profile API")
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
	
	private final ProfileService profileService;
	
	@GetMapping("{userId}")
	@ApiOperation(value="유저 프로필 정보 불러오기(소속정보)")
	@ApiResponses({
		@ApiResponse(code=200, message="프로필 정보를 정상적으로 불러왔습니다."),
		@ApiResponse(code=409, message="프로필 정보를 불러오지 못했습니다."),
	})
	public ResponseEntity<? extends BaseResponseDto> getProfile(
//			@ApiIgnore @RequestHeader("Authorization") String accessToken,
			@PathVariable("userId") @ApiParam(value="회원의 userId", required=true) UUID userId) {
		ProfileResponseDto profileResponseDto = null;
		try {
//			profileResponseDto = profileService.getProfile(accessToken, userId);
			profileResponseDto = profileService.getProfile(userId);
		} catch(Exception e) {
			return ResponseEntity.status(409).body(BaseResponseDto.of(200, "회원정보를 불러오지 못했습니다."));
		}
		
		return ResponseEntity.status(200).body(ProfileResponseDto.of(200, "회원정보를 정상적으로 불러왔습니다", profileResponseDto));
	}
}
