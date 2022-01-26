package com.dd.api.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dd.api.dto.request.CommunityRegisterRequestDto;
import com.dd.db.entity.board.Community;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.CommunityRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService {

	private final AuthRepository authRepository;
	
	private final UserDepartmentRepository userDepartmentRepository;
	
	private final CommunityRepository communityRepository;
	
	private final JwtAuthenticationProvider jwtAuthenticationProvider;
	
	@Override
	public void writeArticle(String accessToken, CommunityRegisterRequestDto communityRegistPostReq) {
		String token = accessToken.split(" ")[1];
		String loginId = jwtAuthenticationProvider.getUsername(token);
		// 게시글 등록하는 유저 정보 가져오기
		User user = authRepository.findByLoginId(loginId).get().getUser();
		// 유저 소속 정보 가져오기
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		// 학교 가져오기
		School school = userDepartment.getSchool();
		// 현재 시간 가져오기
		LocalDateTime currentDateTime = LocalDateTime.now();
		
		Community community = Community.builder()
				.title(communityRegistPostReq.getTitle())
				.content(communityRegistPostReq.getContent())
				.regTime(currentDateTime)
				.school(school)
				.user(user)
				.build();
		
		communityRepository.save(community);
	}

}
