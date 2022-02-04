package com.dd.api.service;

import com.dd.api.dto.request.StudyRecordRegistRequestDto;
import com.dd.db.entity.addon.StudyRecord;

public interface StudyRecordService {
	StudyRecord createStudyRecord(String accessToken, StudyRecordRegistRequestDto studyRecordRegistRequestDto);
//	StudyRecord updateChecklist(ChecklistUpdateRequestDto checklistUpdateRequestDto);
//	StudyRecord deleteChecklist(UUID checklistId);
//	ChecklistResponseDto getChecklist(UUID checklistId);
//	List<ChecklistResponseDto> getChecklistList(String accessToken);
}
