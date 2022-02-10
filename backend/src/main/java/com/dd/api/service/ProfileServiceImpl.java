package com.dd.api.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dd.api.dto.response.ProfileImageGetResponseDto;
import com.dd.api.dto.response.ProfileResponseDto;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.db.repository.UserRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProfileServiceImpl implements ProfileService {
	
	private final UserRepository userRepository;
	
	private final UserDepartmentRepository userDepartmentRepository;
	
	private final AwsS3Service awsS3Service;
	
	private final JwtAuthenticationProvider jwtAuthenticationProvider;
	
	@Override
	public ProfileResponseDto getProfile(UUID userId) {
		User user = userRepository.findById(userId).orElseThrow(() 
				-> new IllegalArgumentException("해당 유저가 없습니다. id = " + userId));
		
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).orElseThrow(() 
				-> new IllegalArgumentException("해당 유저가 없습니다. id = + userId"));
		
		String fileName = awsS3Service.getThumbnailPath(user);
		return new ProfileResponseDto(user, userDepartment, fileName);
	}
	
	@Override
	public ProfileImageGetResponseDto getProfileImage(UUID userId) {
		
		User user = userRepository.findById(userId).orElse(null);
		
		if(user == null) return null;
		
		String fileName = awsS3Service.getThumbnailPath(user);
		
		return new ProfileImageGetResponseDto(fileName);
	}
	
	@Override
	public String getLoginIdFromToken(String accessToken) {
		String token = accessToken.split(" ")[1];
		return jwtAuthenticationProvider.getUsername(token);
	}
}
