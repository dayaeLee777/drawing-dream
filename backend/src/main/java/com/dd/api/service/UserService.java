package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.request.PasswordCheckRequestDTO;
import com.dd.api.dto.request.PasswordUpdateRequestDto;
import com.dd.api.dto.request.UserRegisterRequestDto;
import com.dd.api.dto.request.UserUpdateRequestDto;
import com.dd.api.dto.response.UserInfoResponseDto;

public interface UserService {

	void signUp(UserRegisterRequestDto userRegistPostReq);

	UUID getUserId(String loginId);

//	void deleteUser(String accessToken, UUID userId);
	void deleteUser(UUID userId);

	void updateUser(String accessToken, UserUpdateRequestDto userUpdatePutReq);

	boolean checkPassword(String accessToken, PasswordCheckRequestDTO passwordCheckRequestDTO);

	boolean updatePassword(String accessToken, PasswordUpdateRequestDto passwordUpdateRequestDto);

//	UserInfoResponseDto getUserInfo(String accessToken, UUID userId);
	UserInfoResponseDto getUserInfo(UUID userId);

	boolean checkLoginIdExists(String loginId);

	String GetLoginIdFromToken(String accessToken);

}
