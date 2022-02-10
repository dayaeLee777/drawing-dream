package com.dd.api.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.StudyRecordRegistRequestDto;
import com.dd.api.dto.request.StudyRecordUpdateRequestDto;
import com.dd.api.dto.response.StudyRecordFinishResponseDto;
import com.dd.api.dto.response.StudyRecordGetListWrapperResponseDto;
import com.dd.api.dto.response.StudyRecordResponseDto;
import com.dd.api.dto.response.StudyRecordStartResponseDto;
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
	public StudyRecordStartResponseDto createStudyRecord(String accessToken, StudyRecordRegistRequestDto studyRecordRegistRequestDto) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		LocalDate studyDate = LocalDate.now();
		LocalDateTime startTime =  LocalDateTime.now();
		
		StudyRecord studyRecord = StudyRecord.builder()
				.studyDate(studyDate)
				.startTime(startTime)
				.title(studyRecordRegistRequestDto.getTitle())
				.user(user)
				.build();
		
		StudyRecord studyRecordResult = studyRecordRepository.save(studyRecord);
		StudyRecordStartResponseDto studyRecordStartResponseDto = StudyRecordStartResponseDto.builder()
				.studyRecordId(studyRecordResult.getId())
				.build();
		
		return studyRecordStartResponseDto;
	}

	@Transactional
	@Override
	public StudyRecordFinishResponseDto finishStudyRecord(UUID studyRecordId) {
		StudyRecord studyRecord = studyRecordRepository.findById(studyRecordId).get();
		LocalDateTime endTime = LocalDateTime.now();
		
		Duration duration = Duration.between(studyRecord.getStartTime(), endTime);
		int hours = Long.valueOf(duration.toHours()).intValue();
		int minutes = Long.valueOf(duration.toMinutes() - hours * 60).intValue();
		
		LocalTime durationTime = LocalTime.of(hours, minutes);
		studyRecord.finishStudyRecord(endTime, durationTime);
		studyRecordRepository.save(studyRecord);

		StudyRecordFinishResponseDto studyRecordFinishResponseDto = StudyRecordFinishResponseDto.builder()
				.title(studyRecord.getTitle())
				.durationTime(durationTime)
				.build();

		return studyRecordFinishResponseDto;
	}

	@Transactional
	@Override
	public StudyRecordGetListWrapperResponseDto getStudyRecordListByDate(String accessToken, LocalDate studyDate) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		List<StudyRecordResponseDto> studyRecordList = new ArrayList<StudyRecordResponseDto>();
		LocalTime totalStudyRecord = LocalTime.of(0, 0, 0);
		
		List<StudyRecord> studyRecords = studyRecordRepository.findByUserAndDelYnAndStudyDateOrderByStartTime(user, false, studyDate);
		for(int i=0; i<studyRecords.size(); i++) {
			StudyRecordResponseDto studyRecordResponseDto = StudyRecordResponseDto.builder()
					.studyRecordId(studyRecords.get(i).getId())
					.title(studyRecords.get(i).getTitle())
					.studyDate(studyRecords.get(i).getStudyDate())
					.startTime(studyRecords.get(i).getStartTime())
					.build();
			
			if(studyRecords.get(i).getEndTime() != null) {
				LocalDateTime endTime = studyRecords.get(i).getEndTime();
				LocalTime durationTime = studyRecords.get(i).getDurationTime();
				studyRecordResponseDto.updateEndTime(endTime, durationTime);
				totalStudyRecord = totalStudyRecord.plusMinutes(durationTime.getMinute());
				totalStudyRecord = totalStudyRecord.plusHours(durationTime.getHour());
			}
			studyRecordList.add(studyRecordResponseDto);
		}
		
		return new StudyRecordGetListWrapperResponseDto(studyRecordList, totalStudyRecord);
	}

	@Transactional
	@Override
	public StudyRecordResponseDto getStudyRecord(UUID studyRecordId) {
		StudyRecord studyRecord = studyRecordRepository.findById(studyRecordId).orElse(null);
		
		if(studyRecord == null)
			return null;
		
		StudyRecordResponseDto studyRecordResponseDto = StudyRecordResponseDto.builder()
				.studyRecordId(studyRecord.getId())
				.title(studyRecord.getTitle())
				.studyDate(studyRecord.getStudyDate())
				.startTime(studyRecord.getStartTime())
				.build();
		
		if(studyRecord.getEndTime() != null) {
			LocalDateTime endTime = studyRecord.getEndTime();
			LocalTime durationTime = studyRecord.getDurationTime();
			studyRecordResponseDto.updateEndTime(endTime, durationTime);
		}
		
		return studyRecordResponseDto;
	}

	@Transactional
	@Override
	public StudyRecord deleteStudyRecord(UUID studyRecordId) {
		StudyRecord studyRecord = studyRecordRepository.findById(studyRecordId).orElse(null);
		if(studyRecord == null)
			return null;
		
		studyRecord.deleteStudyRecord();
		return studyRecordRepository.save(studyRecord);
	}

	@Transactional
	@Override
	public StudyRecord updateStudyRecord(StudyRecordUpdateRequestDto studyRecordUpdateRequestDto) {
		StudyRecord studyRecord = studyRecordRepository.findById(studyRecordUpdateRequestDto.getStudyRecordId()).orElse(null);
		if(studyRecord == null)
			return null;
		
		studyRecord.updateStudyRecord(studyRecordUpdateRequestDto.getTitle());
		return studyRecordRepository.save(studyRecord);
	}
	

}
