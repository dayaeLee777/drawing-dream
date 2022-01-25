package com.dd.api.service.schoollife;

import java.util.Date;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dd.api.request.schoollife.attendance.AttendanceDelPutReq;
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
		
		if(attendanceRepository.findByDateAndUser(today, user).orElse(null) == null)
			return null;
		
		Attendance attendance = new Attendance();
		
		attendance.setAttendanceCode(Code.C02);
		attendance.setDate(today);
		attendance.setUser(user);
		
		return attendanceRepository.save(attendance);
	}
	
	@Transactional
	@Override
	public Attendance deleteAttendance(AttendanceDelPutReq attendanceDelPutReq) {		
		Date date = attendanceDelPutReq.getDate();
		UUID userId = attendanceDelPutReq.getUserId();
		Attendance attendance = attendanceRepository.findByDateAndUserId(date, userId).orElse(null);
		
		if(attendance==null)
			return null;
		
		attendance.setDelYn(true);
		
		return attendanceRepository.save(attendance);
	}

}
