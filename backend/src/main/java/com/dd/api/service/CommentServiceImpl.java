package com.dd.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.CommentRegisterRequestDto;
import com.dd.api.dto.request.CommentUpdateRequestDto;
import com.dd.api.dto.response.CommentGetListResponseDto;
import com.dd.api.dto.response.CommentGetListWrapperResponseDto;
import com.dd.db.entity.board.Comment;
import com.dd.db.entity.board.Community;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.CommentRepository;
import com.dd.db.repository.CommunityRepository;
import com.dd.db.repository.UserRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
	
	private final AuthRepository authRepository;
	
	private final UserRepository userRepository;
	
	private final CommunityRepository communityRepository;
	
	private final CommentRepository commentRepository;
	
	private final JwtAuthenticationProvider jwtAuthenticationProvider;

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
	
	@Override
//	public CommentGetListWrapperResponseDto getCommentList(String accessToken, UUID communityId) {
	public CommentGetListWrapperResponseDto getCommentList(UUID communityId) {

		List<CommentGetListResponseDto> list = new ArrayList<>();
		Community community = communityRepository.findById(communityId).get();
		
		for(Comment c : commentRepository.findByCommunityAndParentIsNull(community).get()) {
			if(c.isDelYn()) continue;
			list.add(
				new CommentGetListResponseDto(c.getUser().getId(),
				c.getContent(), c.getRegTime(), c.getId())
			);
		}
		
		return new CommentGetListWrapperResponseDto(list);
	}
	
	@Override
//	public boolean updateComment(String accessToken, CommentUpdateRequestDto commentUpdateRequestDto) {
	public boolean updateComment(CommentUpdateRequestDto commentUpdateRequestDto) {
//		String loginId = getLoginIdFromToken(accessToken);
		String loginId = "test1";
		
		UUID userId = authRepository.findByLoginId(loginId).get().getUser().getId();
		// 수정할 Comment
		Comment comment = commentRepository.findById(commentUpdateRequestDto.getCommentId()).get();
		
		if(userId != comment.getUser().getId()) return false;
		
		comment.update(commentUpdateRequestDto.getContent());
		commentRepository.save(comment);
		
		return true;
	}
	
	@Override
//	public boolean deleteComment(String accessToken, UUID commentId) {
	public boolean deleteComment(UUID commentId) {
//		String loginId = getLoginIdFromToken(accessToken);
		String loginId = "test1";
		
		UUID userId = authRepository.findByLoginId(loginId).get().getUser().getId();
		// 삭제할 Comment
		Comment comment = commentRepository.findById(commentId).get();
		
		if(userId != comment.getUser().getId()) return false;
		
		comment.update(true);
		
		commentRepository.save(comment);
		return true;
	}
	
	@Override
	public String getLoginIdFromToken(String accessToken) {
		String token = accessToken.split(" ")[1];
		return jwtAuthenticationProvider.getUsername(token);
	}
}
