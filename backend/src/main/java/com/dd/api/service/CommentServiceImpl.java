package com.dd.api.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.CommentRegisterRequestDto;
import com.dd.db.entity.board.Comment;
import com.dd.db.entity.board.Community;
import com.dd.db.entity.user.User;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.CommentRepository;
import com.dd.db.repository.CommunityRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
	
	private final AuthRepository authRepository;
	
	private final UserRepository userRepository;
	
	private final CommunityRepository communityRepository;
	
	private final CommentRepository commentRepository;

	@Override
//	public void registerComment(String accessToken, CommentRegisterRequestDto commentRegisterRequestDto) {
	public void registerComment(CommentRegisterRequestDto commentRegisterRequestDto) {
//		String token = accessToken.split(" ")[1];
//		String loginId = jwtAuthenticationProvider.getUsername(token);
		String loginId = "test1";
		
		// 댓글을 등록하는 게시물 정보 가져오기
		Community community = communityRepository.findById(commentRegisterRequestDto.getCommunityId()).get();
		// 댓글 등록하는 유저 정보 가져오기
		User user = authRepository.findByLoginId(loginId).get().getUser();
		// 현재 시간 가져오기
		LocalDateTime currentDateTime = LocalDateTime.now();
		
		Comment comment = Comment.builder()
				.content(commentRegisterRequestDto.getContent())
				.regTime(currentDateTime)
				.user(user)
				.community(community)
				.build();
		
		commentRepository.save(comment);
	}
}
