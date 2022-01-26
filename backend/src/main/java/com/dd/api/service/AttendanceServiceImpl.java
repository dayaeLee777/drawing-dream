package com.dd.api.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.AttendanceUpdateRequestDto;
import com.dd.api.response.AttendanceListGetRes;
import com.dd.db.entity.schoollife.Attendance;
import com.dd.db.entity.user.User;
import com.dd.db.enums.Code;
import com.dd.db.repository.AttendanceRepository;
import com.dd.db.repository.AuthRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Service("attendanceService")
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {
	
	private final AttendanceRepository attendanceRepository;
	
	private final AuthRepository authRepository;
	
	private final JwtAuthenticationProvider jwtAuthenticationProvider;
	
	@Transactional
	@Override
	public Attendance createAttendance(String accessToken) {
		String token = accessToken.split(" ")[1];
		String loginId = jwtAuthenticationProvider.getUsername(token);
		User user = authRepository.findByLoginId(loginId).get().getUser();
		LocalDate todayDate = LocalDate.now();
		
		if(attendanceRepository.findByDateAndUser(todayDate, user).orElse(null) == null)
			return null;
		
		Attendance attendance = Attendance.builder()
				.attendanceCode(Code.C02)
				.date(todayDate)
				.user(user)
				.build();
		
		return attendanceRepository.save(attendance);
	}
	
	@Transactional
	@Override
	public List<AttendanceListGetRes> getAttendancebyUserId(String accessToken, UUID userId) {
		List<AttendanceListGetRes> attendanceListGetRes = new ArrayList<AttendanceListGetRes>();
		attendanceRepository.findByUserIdAndDelYnOrderByDateDesc(userId, false).forEach(attendance -> {
			AttendanceListGetRes attendanceGetRes = AttendanceListGetRes.builder()
					.attendanceId(attendance.getId())
					.userId(attendance.getUser().getId())
					.attendanceCode(attendance.getAttendanceCode())
					.date(attendance.getDate())
					.build();
			attendanceListGetRes.add(attendanceGetRes);
		});
		return attendanceListGetRes;
	}

	@Transactional
	@Override
	public Attendance updateAttendance(String accessToken, AttendanceUpdateRequestDto attendanceUpdatePutReq) {
		UUID attendanceId = attendanceUpdatePutReq.getAttendanceId();
		Attendance attendance = attendanceRepository.findById(attendanceId).orElse(null);
		
		if(attendance==null)
			return null;
		
		attendance.updateAttendance(attendanceUpdatePutReq.getDate(), attendanceUpdatePutReq.getAttendanceCode());
		return attendanceRepository.save(attendance);
	}

	@Transactional
	@Override
	public Attendance deleteAttendance(String accessToken, UUID attendanceId) {		
		Attendance attendance = attendanceRepository.findById(attendanceId).orElse(null);
		
		if(attendance==null)
			return null;
		
		attendance.deleteAttendance();
		return attendanceRepository.save(attendance);
	}

}
