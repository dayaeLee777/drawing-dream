package com.dd.api.service.schoollife;

import com.dd.db.entity.schoollife.Attendance;

public interface AttendanceService {
	Attendance createAttendance(String accessToken);
//	Attendance getAttendancebyUserId(UUID userId);
//	Attendance updateAttendance(String accessToken, UserUpdatePutReq userUpdatePutReq);
//	Attendance deleteAttendance(String accessToken, UUID userId);
}
