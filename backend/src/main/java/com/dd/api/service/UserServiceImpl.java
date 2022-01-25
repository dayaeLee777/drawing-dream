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
	public void signUp(UserRegistPostReq userRegistPostReq) {
		
		// User 빌더 생성 - immutable (불변)
		User user = User.builder()
				.userName(userRegistPostReq.getUserName())
				.userEmail(userRegistPostReq.getUserEmail())
				.phone(userRegistPostReq.getPhone())
				.parentPhone(userRegistPostReq.getParentPhone())
				.address(userRegistPostReq.getAddress())
				.build();
		
		userRepository.save(user);
		
		
		// auth
		Auth auth = Auth.builder()
				.loginId(userRegistPostReq.getLoginId())
				.password(passwordEncoder.encode(userRegistPostReq.getPassword()))
				.user(user)
				.build();
		
		authRepository.save(auth);
		
		
		// UserDepartment
		// UUID schoolId = schoolRepository.findIdBySchoolName(userRegistPostReq.getSchoolName()).get();
		School school = schoolRepository.findBySchoolName(userRegistPostReq.getSchoolName()).get();
		UserDepartment userDepartment = UserDepartment.builder()
				.gradeCode(userRegistPostReq.getGradeCode())
				.classCode(userRegistPostReq.getClassCode())
				.studentNo(userRegistPostReq.getStudentNo())
				.school(school)
				.user(user)
				.build();

		userDepartmentRepository.save(userDepartment);
		
	}

	@Transactional
	@Override
	public void updateUser(String accessToken, UserUpdatePutReq userUpdatePutReq) {
		String token = accessToken.split(" ")[1]; // Bearer 있을 기준
		String loginId = jwtAuthenticationProvider.getUsername(token);
		
		// 유저 정보 update
		User user = authRepository.findByLoginId(loginId).get().getUser();
		User userAfterUpdate = User.builder()
				.userName(user.getUserName())
				.userEmail(user.getUserEmail())
				.phone(user.getPhone())
				.parentPhone(user.getParentPhone())
				.address(user.getAddress())
				.delYn(user.isDelYn())
				.build();

		userRepository.save(userAfterUpdate);
		
		// Auth 정보 update
		Auth auth = authRepository.findByLoginId(loginId).get();
		Auth authAfterUpdate = Auth.builder()
				.loginId(loginId)
				.user(userAfterUpdate)
				.password(auth.getPassword())
				.build();
		
		authRepository.save(authAfterUpdate);
		
		// UserDepartment 정보 update
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		UserDepartment userDepartmentAfterUpdate = UserDepartment.builder()
				.gradeCode(userUpdatePutReq.getGradeCode())
				.classCode(userUpdatePutReq.getClassCode())
				.studentNo(userUpdatePutReq.getStudentNo())
				.stateCode(userDepartment.getStateCode())
				.approvalCode(userDepartment.getApprovalCode())
				.userCode(userDepartment.getUserCode())
				.user(userAfterUpdate)
				.school(userDepartment.getSchool())
				.build();
		
		userDepartmentRepository.save(userDepartmentAfterUpdate);
		
	}
	
	@Transactional
	@Override
	public void deleteUser(String accessToken, UUID userId) {
		String token = accessToken.split(" ")[1]; // Bearer 있을 기준
		String loginId = jwtAuthenticationProvider.getUsername(token);
		
		// user 삭제여부 true 설정
		User user = userRepository.findById(userId).get();
		User userAfterDelete = User.builder()
				.userName(user.getUserName())
				.userEmail(user.getUserEmail())
				.phone(user.getPhone())
				.parentPhone(user.getParentPhone())
				.address(user.getAddress())
				.delYn(true)
				.build();
		
//		if(authRepository.findByLoginId(loginId).get().getUser() != user) return;
		
		// auth 삭제여부 true 설정
		Auth auth = authRepository.findByUser(user).get();
		Auth authAfterDelete = Auth.builder()
				.loginId(auth.getLoginId())
				.user(auth.getUser())
				.password(auth.getPassword())
				.delYn(true)
				.build();
				
		// userDepartment 삭제여부 true 설정
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		UserDepartment userDepartmentAfterDelete = UserDepartment.builder()
				.gradeCode(userDepartment.getGradeCode())
				.classCode(userDepartment.getClassCode())
				.studentNo(userDepartment.getStudentNo())
				.stateCode(userDepartment.getStateCode())
				.approvalCode(userDepartment.getApprovalCode())
				.userCode(userDepartment.getUserCode())
				.user(userDepartment.getUser())
				.school(userDepartment.getSchool())
				.delYn(true)
				.build();
		
		userRepository.save(userAfterDelete);
		authRepository.save(authAfterDelete);
		userDepartmentRepository.save(userDepartmentAfterDelete);
	}
	
	@Override
	public UUID getUserId(String loginId) {
		Auth auth = authRepository.findByLoginId(loginId).get();
		return auth.getUser().getId();
	}
}
