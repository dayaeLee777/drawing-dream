package com.dd.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dd.api.dto.response.ScoreGetResponseDto;
import com.dd.api.dto.response.ScoreGetWrapperResponseDto;
import com.dd.db.entity.schoollife.Score;
import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.CommunityRepository;
import com.dd.db.repository.ScoreRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScoreServiceImpl implements ScoreService {
	
	private final AuthRepository authRepository;
	
	private final ScoreRepository scoreRepository;
	
	private final JwtAuthenticationProvider jwtAuthenticationProvider;
	
	@Override
	public ScoreGetWrapperResponseDto getScoreList(String accessToken) {
		String loginId = getLoginIdFromToken(accessToken);
		
		Auth auth = authRepository.findByLoginId(loginId).get();
		User user = auth.getUser();
		
		if(user == null) return null;
		
		List<ScoreGetResponseDto> list = new ArrayList<>();
		
		for(Score score : scoreRepository.findByUserAndDelYn(user, false, Sort.by("semesterCode").and(Sort.by("gradeCode"))).get()) {
			list.add(new ScoreGetResponseDto(
						score.getId(),
						score.getGradeCode(),
						score.getSemesterCode(),
						score.getTestCode(),
						score.getSubjectCode(),
						score.getScore()));
		}
		
		return new ScoreGetWrapperResponseDto(list);
	}
	
	@Override
	public String getLoginIdFromToken(String accessToken) {
		String token = accessToken.split(" ")[1];
		return jwtAuthenticationProvider.getUsername(token);
	}
}
