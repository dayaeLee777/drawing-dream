package com.dd.api.service.schoollife;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dd.db.entity.schoollife.Attendance;
import com.dd.db.entity.user.User;
import com.dd.db.enums.Code;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.schoollife.AttendanceRepository;
import com.dd.security.util.JwtAuthenticationProvider;

@Service("attendanceService")
public class AttendanceServiceImpl implements AttendanceService {

	@Autowired
	AttendanceRepository attendanceRepository;
	
	@Autowired
	AuthRepository authRepository;
	
	@Autowired
	JwtAuthenticationProvider jwtAuthenticationProvider;
	
	@Transactional
	@Override
	public Attendance createAttendance(String accessToken) {
		String token = accessToken.split(" ")[1];
		String loginId = jwtAuthenticationProvider.getUsername(token);
		User user = authRepository.findByLoginId(loginId).get().getUser();
		Date today = new Date();
		
		if(attendanceRepository.findByDateAndUserId(today, user.getId()).orElse(null) != null)
			return null;
		
		Attendance attendance = new Attendance();
		
		attendance.setAttendanceCode(Code.C02);
		attendance.setDate(today);
		attendance.setUser(user);
		
		return attendanceRepository.save(attendance);
	}

}
