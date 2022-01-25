package com.dd.api.service.schoollife;

import com.dd.api.request.schoollife.attendance.AttendanceDelPutReq;
import com.dd.db.entity.schoollife.Attendance;

public interface AttendanceService {
	Attendance createAttendance(String accessToken);
//	Attendance getAttendancebyUserId(UUID userId);
//	Attendance updateAttendance(String accessToken, UserUpdatePutReq userUpdatePutReq);
	Attendance deleteAttendance(AttendanceDelPutReq attendanceDelPutReq);
}
