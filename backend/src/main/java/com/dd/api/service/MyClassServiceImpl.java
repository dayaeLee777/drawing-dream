package com.dd.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;


import com.dd.api.dto.response.CommunityGetListResponseDto;
import com.dd.api.dto.response.CommunityGetListWrapperResponseDto;
import com.dd.api.dto.response.MyClassGetListResponseDto;
import com.dd.api.dto.response.MyClassGetListWrapperResponseDto;
import com.dd.db.enums.Code;
import com.dd.db.entity.board.Community;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.db.repository.UserRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MyClassServiceImpl implements MyClassService {
	
	private final AuthRepository authRepository;
	
	private final UserDepartmentRepository userDepartmentRepository;
	
	private final JwtAuthenticationProvider jwtAuthenticationProvider;
	
	@Override
	public MyClassGetListWrapperResponseDto getMyClassList(String accessToken) {
//	public MyClassGetListWrapperResponseDto getMyClassList() {
		String loginId = getLoginIdFromToken(accessToken);
		
		Auth auth = authRepository.findByLoginId(loginId).get();
		User user = auth.getUser();
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		School school = userDepartment.getSchool();
		
		// 학년 반
		Code gradeCode = userDepartment.getGradeCode();
		Code classCode = userDepartment.getClassCode();
		
		List<MyClassGetListResponseDto> list = new ArrayList<>();
		
		for(UserDepartment ud : userDepartmentRepository.findBySchoolAndGradeCodeAndClassCode(school, gradeCode, classCode).get()) {
			if(ud.isDelYn()) continue;
			
			list.add(
				new MyClassGetListResponseDto(ud.getUser().getId(),
				ud.getUser().getUserName(), ud.getUserCode(), ud.getGradeCode(), ud.getClassCode(), ud.getStudentNo())
			);
		}
		
		return new MyClassGetListWrapperResponseDto(list);
	}
	
	@Override
	public String getLoginIdFromToken(String accessToken) {
		String token = accessToken.split(" ")[1];
		return jwtAuthenticationProvider.getUsername(token);
	}
}
