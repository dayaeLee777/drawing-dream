package com.dd.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.dd.api.dto.response.CalendarGetListResponseDto;
import com.dd.api.dto.response.CalendarGetListWrapperResponseDto;
import com.dd.api.dto.response.MyClassGetListResponseDto;
import com.dd.api.dto.response.MyClassGetListWrapperResponseDto;
import com.dd.db.entity.school.Calendar;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.enums.Code;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.CalendarRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{
	
	private final AuthRepository authRepository;
	
	private final UserDepartmentRepository userDepartmentRepository;
	
	private final JwtAuthenticationProvider jwtAuthenticationProvider;
	
	private final CalendarRepository calendarRepository;
	
	@Override
	public CalendarGetListWrapperResponseDto getCalendarList(String accessToken) {
		String loginId = getLoginIdFromToken(accessToken);
		
		Auth auth = authRepository.findByLoginId(loginId).get();
		User user = auth.getUser();
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		School school = userDepartment.getSchool();
		
		// 조회 user 학년
		Code gradeCode = userDepartment.getGradeCode();
		
		List<CalendarGetListResponseDto> list = new ArrayList<>();
		
		for(Calendar c : calendarRepository.findBySchoolAndDelYnOrderByStartDate(school, false).get()) {
			if( c.getGradeCode() != gradeCode && c.getGradeCode() != Code.E00) continue;
			
			list.add(
				new CalendarGetListResponseDto(c.getId(), c.getGradeCode(), c.getTestCode(), 
						c.getStartDate(), c.getEndDate())
			);
		}
		
		return new CalendarGetListWrapperResponseDto(list);
	}
	
	@Override
	public CalendarGetListWrapperResponseDto getCalendarListForTeacher(String accessToken) {
		String loginId = getLoginIdFromToken(accessToken);
		
		Auth auth = authRepository.findByLoginId(loginId).get();
		User user = auth.getUser();
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		School school = userDepartment.getSchool();
		
		List<CalendarGetListResponseDto> list = new ArrayList<>();
		
		for(Calendar c : calendarRepository.findBySchoolAndDelYnOrderByStartDate(school, false).get()) {
			list.add(
				new CalendarGetListResponseDto(c.getId(), c.getGradeCode(), c.getTestCode(), 
						c.getStartDate(), c.getEndDate())
			);
		}
		
		return new CalendarGetListWrapperResponseDto(list);
	}
	
	@Override
	public String getLoginIdFromToken(String accessToken) {
		String token = accessToken.split(" ")[1];
		return jwtAuthenticationProvider.getUsername(token);
	}
}
