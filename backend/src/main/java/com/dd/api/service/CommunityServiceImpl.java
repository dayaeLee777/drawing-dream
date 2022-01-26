package com.dd.api.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.CommunityRegisterRequestDto;
import com.dd.api.dto.request.CommunityUpdateRequestDto;
import com.dd.db.entity.board.Community;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.CommunityRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.db.repository.UserRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService {

	private final AuthRepository authRepository;
	
	private final UserRepository userRepository;
	
	private final UserDepartmentRepository userDepartmentRepository;
	
	private final CommunityRepository communityRepository;
	
	private final JwtAuthenticationProvider jwtAuthenticationProvider;
	
	@Override
//	public void registerCommunity(String accessToken, CommunityRegisterRequestDto communityRegisterRequestDto) {
	public void registerCommunity(CommunityRegisterRequestDto communityRegisterRequestDto) {
//		String token = accessToken.split(" ")[1];
//		String loginId = jwtAuthenticationProvider.getUsername(token);
		String loginId = "test";
		// 게시글 등록하는 유저 정보 가져오기
		User user = authRepository.findByLoginId(loginId).get().getUser();
		// 유저 소속 정보 가져오기
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		// 학교 가져오기
		School school = userDepartment.getSchool();
		// 현재 시간 가져오기
		LocalDateTime currentDateTime = LocalDateTime.now();
		
		Community community = Community.builder()
				.title(communityRegisterRequestDto.getTitle())
				.content(communityRegisterRequestDto.getContent())
				.regTime(currentDateTime)
				.school(school)
				.user(user)
				.build();
		
		communityRepository.save(community);
	}
	
	@Override
//	public void updateCommunity(String accessToken, CommunityUpdateRequestDto communityUpdateRequestDto) {
	public void updateCommunity(CommunityUpdateRequestDto communityUpdateRequestDto) {
//		String token = accessToken.split(" ")[1];
//		String loginId = jwtAuthenticationProvider.getUsername(token);
		String loginId = "test";
		
		Auth auth = authRepository.findByLoginId(loginId).get();
		User user = auth.getUser();
		
		// 커뮤니티 글 제목, 내용 update
		Community community = communityRepository.findByUser(user).get();
		community.update(communityUpdateRequestDto.getTitle(), communityUpdateRequestDto.getContent());
		
		communityRepository.save(community);
	}
	
	@Override
	public void plusCommunityHit(Community community) {
		community.updateHit();
	}
	
	
	@Override
	public String getLoginIdFromToken(String accessToken) {
		String token = accessToken.split(" ")[1];
		return jwtAuthenticationProvider.getUsername(token);
	}
	


}
