package com.dd.api.service;

import java.util.List;
import java.util.UUID;

import com.dd.api.dto.request.ChecklistRegistRequestDto;
import com.dd.api.dto.request.ChecklistUpdateRequestDto;
import com.dd.api.dto.response.ChecklistResponseDto;
import com.dd.db.entity.addon.Checklist;

public interface ChecklistService {
	Checklist createChecklist(String accessToken, ChecklistRegistRequestDto checklistRegistRequestDto);
	Checklist updateChecklist(ChecklistUpdateRequestDto checklistUpdateRequestDto);
	Checklist deleteChecklist(UUID checklistId);
	ChecklistResponseDto getChecklist(UUID checklistId);
	List<ChecklistResponseDto> getChecklistList(String accessToken);
}
