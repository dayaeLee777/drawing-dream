package com.dd;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import com.dd.api.service.AttendanceService;
import com.dd.db.entity.addon.StudyRecord;
import com.dd.db.entity.school.Period;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.User;
import com.dd.db.enums.Code;
import com.dd.db.repository.AttendanceRepository;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.PeriodRepository;
import com.dd.db.repository.SchoolRepository;
import com.dd.db.repository.StudyRecordRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.db.repository.UserRepository;

@Transactional
@SpringBootTest
class DrawingdreamBackendApplicationTests {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	AuthRepository authRepository;
	
	@Autowired
	SchoolRepository schoolRepository;
	
	@Autowired
	UserDepartmentRepository userDepartmentRepository;
	
	@Autowired
	AttendanceRepository attendanceRepository;
	
	@Autowired
	AttendanceService attendanceService;
	
	@Autowired
	StudyRecordRepository studyRecordRepository;
	
	@Autowired
	PeriodRepository periodRepository;
	
	@Test
	@Rollback(value = false)
	void contextLoads() throws ParseException {
//		User user = new User();
//		user.setUser_name("싸피");
//		userRepository.save(user);
//		
//		studyRecordRepository.findAll().forEach(i ->{
//			System.out.println(i.getId());
//		});
//		Auth auth = new Auth();
//		auth.setUser(user);
//		auth.setLoginId("ssafy");
//		authRepository.save(auth);
		
		User user = authRepository.findByLoginId("sdrawingdream01").get().getUser();
		
		
		StudyRecord studyrecord = StudyRecord.builder()
				.studyDate(LocalDate.of(2022, 2, 16))
				.startTime(LocalDateTime.of(2022, 2, 16, 9, 00))
				.endTime(LocalDateTime.of(2022, 2, 16, 9, 50))
				.durationTime(LocalTime.of(0, 50))
				.title("국어")
				.user(user)
				.build();
		studyRecordRepository.save(studyrecord);
		
		StudyRecord studyrecord1 = StudyRecord.builder()
				.studyDate(LocalDate.of(2022, 2, 16))
				.startTime(LocalDateTime.of(2022, 2, 16, 10, 30))
				.endTime(LocalDateTime.of(2022, 2, 16, 11, 30))
				.durationTime(LocalTime.of(1, 00))
				.title("영어")
				.user(user)
				.build();
		studyRecordRepository.save(studyrecord1);
		
		StudyRecord studyrecord2 = StudyRecord.builder()
				.studyDate(LocalDate.of(2022, 2, 16))
				.startTime(LocalDateTime.of(2022, 2, 16, 13, 15))
				.endTime(LocalDateTime.of(2022, 2, 16, 14, 30))
				.durationTime(LocalTime.of(1, 15))
				.title("과학")
				.user(user)
				.build();
		studyRecordRepository.save(studyrecord2);
		
//		System.out.println(authTest);
		
//		UserDepartment userDepartment = new UserDepartment();
////		Code.B01.getName();	// 코드 설명 받아오기
//		userDepartment.setStateCode(Code.B01);
//		userDepartment.setUser(user);
//		userDepartmentRepository.save(userDepartment);
		
		// 트랜잭션 적용해서 테스트해야함
//		Auth authTest = ar.findByLoginId("ssafy").get();
		
		
//		Attendance attendance = Attendance.builder()
//				.attendanceCode(Code.C02)
//				.user(user)
//				.date(date)
//				.delYn(false)
//				.build();
//		System.out.println(attendance.getUser());
//		attendanceRepository.save(attendance);
		
//		UUID userId = attendanceUpdatePutReq.getUserId();
//		User user = userRepository.findById(attendanceUpdatePutReq.getUserId()).get();
//		User user = authRepository.findByLoginId("user").get().getUser();
//		UUID userid = user.getId();
//		System.out.println(user.getId());
//		LocalDate date = LocalDate.of(2022, 01, 26);
//		Attendance at = Attendance.builder()
//				.date(date)
//				.user(user)
//				.attendanceCode(Code.C01)
//				.build();
//		
//		attendanceRepository.save(at);
		
		
//		System.out.println(attendanceService.getAttendancebyUserId(userid));
//		
//		Attendance a = attendanceRepository.findByDateAndUser(date, user).get();
//		System.out.println(a.getId());
//		Attendance attendance = attendanceRepository.findByDateAndUser(today, user).orElse(null);
//		UUID userId = user.getId();
//		boolean a = attendanceRepository.findDelYnByDateAndUserId(date, userId);
//		System.out.println("boolean : " + a);
//		Attendance attendance = attendanceRepository.findByDateAndUserId(date, userId).orElse(null);
//		
//		if(attendance == null)
//			System.out.println("없어용~~~~~~~~~~~");
//		else {
//			System.out.println(attendance.toString());
//		}
		
//		Attendance attendance = new Attendance();
//		attendance.setAttendanceCode(Code.C02);
//		attendance.setDate(today);
//		attendance.setUser(user);
//		attendanceRepository.save(attendance);
	}

}
