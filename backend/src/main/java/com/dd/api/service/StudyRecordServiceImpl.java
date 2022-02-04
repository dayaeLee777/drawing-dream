package com.dd.api.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.StudyRecordRegistRequestDto;
import com.dd.db.entity.addon.StudyRecord;
import com.dd.db.entity.user.User;
import com.dd.db.repository.StudyRecordRepository;

import lombok.RequiredArgsConstructor;

@Service("studyRecordService")
@RequiredArgsConstructor
public class StudyRecordServiceImpl implements StudyRecordService {

	private final JwtTokenService jwtTokenService;
	
	private final StudyRecordRepository studyRecordRepository;
	
	@Transactional
	@Override
	public StudyRecord createStudyRecord(String accessToken, StudyRecordRegistRequestDto studyRecordRegistRequestDto) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		LocalDate studyDate = LocalDate.now();
		LocalDateTime startTime =  LocalDateTime.now();
		
		StudyRecord studyRecord = StudyRecord.builder()
				.studyDate(studyDate)
				.startTime(startTime)
				.title(studyRecordRegistRequestDto.getTitle())
				.user(user)
				.build();
		
		return studyRecordRepository.save(studyRecord);
	}

}
