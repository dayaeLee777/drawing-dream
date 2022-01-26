package com.dd.api.service;

import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.response.ProfileResponseDto;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProfileServiceImpl implements ProfileService {
	
	private final UserRepository userRepository;
	
	private final UserDepartmentRepository userDepartmentRepository;
	
	
	@Override
	public ProfileResponseDto getProfile(UUID userId) {
		User user = userRepository.findById(userId).orElseThrow(() 
				-> new IllegalArgumentException("해당 유저가 없습니다. id = " + userId));
		
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).orElseThrow(() 
				-> new IllegalArgumentException("해당 유저가 없습니다. id = + userId"));
		
		return new ProfileResponseDto(user, userDepartment);
	}
}
