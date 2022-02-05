package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.request.StudyRecordRegistRequestDto;
import com.dd.api.dto.response.StudyRecordFinishResponseDto;
import com.dd.db.entity.addon.StudyRecord;

public interface StudyRecordService {
	StudyRecord createStudyRecord(String accessToken, StudyRecordRegistRequestDto studyRecordRegistRequestDto);
	StudyRecordFinishResponseDto finishStudyRecord(UUID studyRecordId);
	//	StudyRecord updateChecklist(ChecklistUpdateRequestDto checklistUpdateRequestDto);
//	StudyRecord deleteChecklist(UUID checklistId);
//	ChecklistResponseDto getChecklist(UUID checklistId);
//	List<ChecklistResponseDto> getChecklistList(String accessToken);
}
