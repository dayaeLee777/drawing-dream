package com.dd.api.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.ChecklistRegistRequestDto;
import com.dd.api.dto.request.ChecklistUpdateRequestDto;
import com.dd.api.dto.response.ChecklistResponseDto;
import com.dd.db.entity.addon.Checklist;
import com.dd.db.entity.user.User;
import com.dd.db.repository.ChecklistRepository;

import lombok.RequiredArgsConstructor;

@Service("checklistService")
@RequiredArgsConstructor
public class ChecklistServiceImpl implements ChecklistService {

	private final ChecklistRepository checklistRepository;
	
	private final JwtTokenService jwtTokenService;
	
	@Transactional
	@Override
	public Checklist createChecklist(String accessToken, ChecklistRegistRequestDto checklistRegistRequestDto) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		LocalDateTime currentDateTime = LocalDateTime.now();
		
		Checklist checklist = Checklist.builder()
				.content(checklistRegistRequestDto.getContent())
				.regTime(currentDateTime)
				.isChecked(false)
				.user(user)
				.build();
		
		return checklistRepository.save(checklist);
	}

	@Transactional
	@Override
	public Checklist updateChecklist(ChecklistUpdateRequestDto checklistUpdateRequestDto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional
	@Override
	public Checklist deleteChecklist(UUID checklistId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ChecklistResponseDto getChecklist(UUID checklistId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional
	@Override
	public List<ChecklistResponseDto> getChecklistList(String accessToken) {
		// TODO Auto-generated method stub
		return null;
	}

}
