package com.dd.api.service;

import java.time.LocalDate;
import java.util.UUID;

import com.dd.api.dto.request.StudyRecordRegistRequestDto;
import com.dd.api.dto.response.StudyRecordFinishResponseDto;
import com.dd.api.dto.response.StudyRecordGetListWrapperResponseDto;
import com.dd.api.dto.response.StudyRecordResponseDto;
import com.dd.db.entity.addon.StudyRecord;

public interface StudyRecordService {
	StudyRecord createStudyRecord(String accessToken, StudyRecordRegistRequestDto studyRecordRegistRequestDto);
	StudyRecordFinishResponseDto finishStudyRecord(UUID studyRecordId);
	StudyRecordGetListWrapperResponseDto getStudyRecordListByDate(String accessToken, LocalDate studyDate);
	StudyRecordResponseDto getStudyRecord(UUID studyRecordId);
	//	StudyRecord updateChecklist(ChecklistUpdateRequestDto checklistUpdateRequestDto);
//	StudyRecord deleteChecklist(UUID checklistId);
}
