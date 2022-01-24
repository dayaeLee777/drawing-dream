package com.dd.api.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dd.api.dto.request.CommunityRegistPostReq;
import com.dd.db.entity.board.Community;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.CommunityRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.security.util.JwtAuthenticationProvider;

@Service
public class CommunityServiceImpl implements CommunityService {

	@Autowired
	AuthRepository authRepository;
	
	@Autowired
	UserDepartmentRepository userDepartmentRepository;
	
	@Autowired
	CommunityRepository communityRepository;
	
	@Autowired
	JwtAuthenticationProvider jwtAuthenticationProvider;
	
	@Override
	public void writeArticle(String accessToken, CommunityRegistPostReq communityRegistPostReq) {
		String token = accessToken.split(" ")[1];
		String loginId = jwtAuthenticationProvider.getUsername(token);
		// 게시글 등록하는 유저 정보 가져오기
		User user = authRepository.findByLoginId(loginId).get().getUser();
		// 유저 소속 정보 가져오기
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		// 학교가져오기
		School school = userDepartment.getSchool();
		
		Community community = new Community();
		// communityNo ? 상의 필요
		
		// title
		community.setTitle(communityRegistPostReq.getTitle());
		// content
		community.setContent(communityRegistPostReq.getContent());
		// regTime
		LocalDateTime currentDateTime = LocalDateTime.now();
		community.setRegTime(currentDateTime);
		// school
		community.setSchool(school);
		// user
		community.setUser(user);
		
		communityRepository.save(community);
	}

}
