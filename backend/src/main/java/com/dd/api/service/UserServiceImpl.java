package com.dd.api.service;

import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dd.api.dto.request.UserRegisterRequestDto;
import com.dd.api.dto.request.UserUpdateRequestDto;
import com.dd.api.dto.response.UserInfoResponseDto;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.SchoolRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.db.repository.UserRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
	
	private final PasswordEncoder passwordEncoder;
	
	private final AuthRepository authRepository;
	
	private final UserRepository userRepository;
	
	private final UserDepartmentRepository userDepartmentRepository;
	
	private final SchoolRepository schoolRepository;
	
	private final JwtAuthenticationProvider jwtAuthenticationProvider;
	
	@Transactional
	@Override
	public void signUp(UserRegisterRequestDto userRegisterRequestDto) {
		
		// user builder - 생성
		User user = User.builder()
				.userName(userRegisterRequestDto.getUserName())
				.userEmail(userRegisterRequestDto.getUserEmail())
				.phone(userRegisterRequestDto.getPhone())
				.parentPhone(userRegisterRequestDto.getParentPhone())
				.address(userRegisterRequestDto.getAddress())
				.build();
		
		userRepository.save(user);
		
		// auth
		Auth auth = Auth.builder()
				.loginId(userRegisterRequestDto.getLoginId())
				.password(passwordEncoder.encode(userRegisterRequestDto.getPassword()))
				.user(user)
				.build();
		
		authRepository.save(auth);
		
		// UserDepartment
		School school = schoolRepository.findBySchoolName(userRegisterRequestDto.getSchoolName()).get();
		UserDepartment userDepartment = UserDepartment.builder()
				.gradeCode(userRegisterRequestDto.getGradeCode())
				.classCode(userRegisterRequestDto.getClassCode())
				.studentNo(userRegisterRequestDto.getStudentNo())
				.school(school)
				.user(user)
				.build();
		
		userDepartmentRepository.save(userDepartment);
		
	}

	@Transactional
	@Override
	public void updateUser(String accessToken, UserUpdateRequestDto userUpdateRequestDto) {
		String loginId = GetLoginIdFromToken(accessToken);
		
		// 유저 정보 update
		User user = authRepository.findByLoginId(loginId).get().getUser();
		user.update(userUpdateRequestDto.getPhone(),
				userUpdateRequestDto.getParentPhone(),
				userUpdateRequestDto.getUserEmail(),
				userUpdateRequestDto.getAddress());

		userRepository.save(user);
		
		// Auth 정보 update
		Auth auth = authRepository.findByLoginId(loginId).get();
		auth.update(passwordEncoder.encode(userUpdateRequestDto.getPassword()));
		
		authRepository.save(auth);
		
		// UserDepartment 정보 update
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		userDepartment.update(userUpdateRequestDto.getGradeCode(),
				userUpdateRequestDto.getClassCode(),
				userUpdateRequestDto.getStudentNo());
		
		userDepartmentRepository.save(userDepartment);
	}
	
	@Transactional
	@Override
//	public void deleteUser(String accessToken, UUID userId) {
	public void deleteUser(UUID userId) {
		// user 삭제여부 true 설정
		User user = userRepository.findById(userId).get();
		user.update(true);
		
		userRepository.save(user);
		
		// auth 삭제여부 true 설정
		Auth auth = authRepository.findByUser(user).get();
		auth.update(true);
		
		authRepository.save(auth);
				
		// userDepartment 삭제여부 true 설정
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		userDepartment.update(true);
		
		userDepartmentRepository.save(userDepartment);
	}
	
	@Override
//	public UserInfoResponseDto getUserInfo(String accessToken, UUID userId) {
	public UserInfoResponseDto getUserInfo(UUID userId) {
		
		User user = userRepository.findById(userId).orElseThrow(() 
				-> new IllegalArgumentException("해당 유저가 없습니다. id = " + userId));
		
		return new UserInfoResponseDto(user);
	}
	
	@Override
	public UUID getUserId(String loginId) {
		Auth auth = authRepository.findByLoginId(loginId).get();
		return auth.getUser().getId();
	}
	
	@Override
	public boolean checkLoginIdExists(String loginId) {
		return authRepository.findByLoginId(loginId).isPresent();
	}
	
	@Override
	public String GetLoginIdFromToken(String accessToken) {
		String token = accessToken.split(" ")[1];
		return jwtAuthenticationProvider.getUsername(token);
	}
}
