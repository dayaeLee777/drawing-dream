package com.dd.api.service;

import java.util.List;
import java.util.UUID;

import com.dd.api.dto.request.AttendanceUpdateRequestDto;
import com.dd.api.dto.response.AttendanceListResponseDto;
import com.dd.db.entity.schoollife.Attendance;

public interface AttendanceService {
	Attendance createAttendance(String accessToken);
	List<AttendanceListResponseDto> getAttendancebyUserId(String accessToken, UUID userId);
	Attendance updateAttendance(String accessToken, AttendanceUpdateRequestDto attendanceUpdatePutReq);
	Attendance deleteAttendance(String accessToken, UUID attendanceId);
}
