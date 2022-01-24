package com.dd.api.service;

import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dd.api.dto.request.UserRegistPostReq;
import com.dd.api.dto.request.UserUpdatePutReq;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.SchoolRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.db.repository.UserRepository;
import com.dd.security.util.JwtAuthenticationProvider;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	AuthRepository authRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserDepartmentRepository userDepartmentRepository;
	
	@Autowired
	SchoolRepository schoolRepository;
	
	@Autowired
	JwtAuthenticationProvider jwtAuthenticationProvider;
	
	@Transactional
	@Override
	public void signUp(UserRegistPostReq userRegistPostReq) {
		// User
		User user = new User();
		user.setUserName(userRegistPostReq.getUserName());
		user.setUserEmail(userRegistPostReq.getUserEmail());
		user.setPhone(userRegistPostReq.getPhone());
		user.setParentPhone(userRegistPostReq.getParentPhone());
		user.setAddress(userRegistPostReq.getAddress());
		userRepository.save(user);
		
		// auth
		Auth auth = new Auth();
		auth.setLoginId(userRegistPostReq.getLoginId());
		auth.setPassword(passwordEncoder.encode(userRegistPostReq.getPassword()));
		auth.setUser(user);
		authRepository.save(auth);
		
		// UserDepartment
		// UUID schoolId = schoolRepository.findIdBySchoolName(userRegistPostReq.getSchoolName()).get();
		School school = schoolRepository.findBySchoolName(userRegistPostReq.getSchoolName()).get();
		UserDepartment userDepartment = new UserDepartment();
		userDepartment.setGradeCode(userRegistPostReq.getGradeCode());
		userDepartment.setClassCode(userRegistPostReq.getClassCode());
		userDepartment.setStudentNo(userRegistPostReq.getStudentNo());
		userDepartment.setSchool(school);
		userDepartment.setUser(user);
		userDepartmentRepository.save(userDepartment);
		
	}

	@Transactional
	@Override
	public void updateUser(String accessToken, UserUpdatePutReq userUpdatePutReq) {
		String token = accessToken.split(" ")[1]; // Bearer 있을 기준
		String loginId = jwtAuthenticationProvider.getUsername(token);
		
		// 유저 정보 update
		User user = authRepository.findByLoginId(loginId).get().getUser();
		user.setUserEmail(userUpdatePutReq.getUserEmail());
		user.setPhone(userUpdatePutReq.getPhone());
		user.setParentPhone(userUpdatePutReq.getParentPhone());
		user.setAddress(userUpdatePutReq.getAddress());
		userRepository.save(user);
		
		Auth auth = authRepository.findByLoginId(loginId).get();
		auth.setPassword(passwordEncoder.encode(userUpdatePutReq.getPassword()));
		authRepository.save(auth);
		
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		userDepartment.setGradeCode(userUpdatePutReq.getGradeCode());
		userDepartment.setClassCode(userUpdatePutReq.getClassCode());
		userDepartment.setStudentNo(userUpdatePutReq.getStudentNo());
		userDepartmentRepository.save(userDepartment);
		
	}
	
	@Transactional
	@Override
	public void deleteUser(String accessToken, UUID userId) {
		String token = accessToken.split(" ")[1]; // Bearer 있을 기준
		String loginId = jwtAuthenticationProvider.getUsername(token);
		
		User user = userRepository.findById(userId).get();
		
		if(authRepository.findByLoginId(loginId).get().getUser() != user) return;
		
		Auth auth = authRepository.findByUser(user).get();
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		user.setDelYn(true);
		auth.setDelYn(true);
		userDepartment.setDelYn(true);
		
		userRepository.save(user);
		authRepository.save(auth);
		userDepartmentRepository.save(userDepartment);
	}
	
	@Override
	public UUID getUserId(String loginId) {
		Auth auth = authRepository.findByLoginId(loginId).get();
		return auth.getUser().getId();
	}
}
