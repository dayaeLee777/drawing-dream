package com.dd.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.data.domain.Sort;
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
		Checklist checklist = checklistRepository.findById(checklistUpdateRequestDto.getChecklistId()).orElse(null);
		if(checklist == null)
			return null;
		
		checklist.updateChecklist(checklistUpdateRequestDto.getContent(), checklistUpdateRequestDto.isChecked());
		
		return checklistRepository.save(checklist);
	}

	@Transactional
	@Override
	public Checklist deleteChecklist(UUID checklistId) {
		Checklist checklist = checklistRepository.findById(checklistId).orElse(null);
		if(checklist == null)
			return null;
		
		checklist.deleteChecklist();
		return checklistRepository.save(checklist);
	}

	@Transactional
	@Override
	public ChecklistResponseDto getChecklist(UUID checklistId) {
		Checklist checklist = checklistRepository.findById(checklistId).orElse(null);
		if(checklist==null)
			return null;
		
		ChecklistResponseDto checklistResponseDto = ChecklistResponseDto.builder()
				.cheklistId(checklist.getId())
				.content(checklist.getContent())
				.isChecked(checklist.isChecked())
				.build();
			
		return checklistResponseDto;
	}

	@Transactional
	@Override
	public List<ChecklistResponseDto> getChecklistList(String accessToken) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		List<ChecklistResponseDto> checklistList = new ArrayList<ChecklistResponseDto>();
		
		Sort sort = Sort.by("regTime").descending();
		
		checklistRepository.findByUserIdAndDelYnAndIsChecked(user.getId(), false, false, sort).forEach(checklist -> {
			ChecklistResponseDto checklistResponseDto = ChecklistResponseDto.builder()
					.cheklistId(checklist.getId())
					.content(checklist.getContent())
					.isChecked(checklist.isChecked())
					.build();
			checklistList.add(checklistResponseDto);
		});
		
		checklistRepository.findByUserIdAndDelYnAndIsChecked(user.getId(), false, true, sort).forEach(checklist -> {
			ChecklistResponseDto checklistResponseDto = ChecklistResponseDto.builder()
					.cheklistId(checklist.getId())
					.content(checklist.getContent())
					.isChecked(checklist.isChecked())
					.build();
			checklistList.add(checklistResponseDto);
		});
		
		return checklistList;
	}

}
