package com.dd.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.CommentUpdateRequestDto;
import com.dd.api.dto.request.SubCommentRegisterRequestDto;
import com.dd.api.dto.response.SubCommentGetListResponseDto;
import com.dd.api.dto.response.SubCommentGetListWrapperResponseDto;
import com.dd.db.entity.board.Comment;
import com.dd.db.entity.board.Community;
import com.dd.db.entity.user.User;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.CommentRepository;
import com.dd.db.repository.CommunityRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubCommentServiceImpl implements SubCommentService {
	
	private final AuthRepository authRepository;
	
	private final CommunityRepository communityRepository;
	
	private final CommentRepository commentRepository;
	
	private final JwtAuthenticationProvider jwtAuthenticationProvider;

	@Override
	public void registerSubComment(String accessToken, SubCommentRegisterRequestDto subCommentRegisterRequestDto) {
		String loginId = getLoginIdFromToken(accessToken);
		
		// 댓글을 등록하는 게시물 정보 가져오기
		Community community = communityRepository.findById(subCommentRegisterRequestDto.getCommunityId()).get();
		// 댓글 등록하는 유저 정보 가져오기
		User user = authRepository.findByLoginId(loginId).get().getUser();
		// 현재 시간 가져오기
		LocalDateTime currentDateTime = LocalDateTime.now();
		// 상위 댓글 가져오기
		Comment comment = commentRepository.findById(subCommentRegisterRequestDto.getCommentId()).get();
		
		Comment subComment = Comment.builder()
				.content(subCommentRegisterRequestDto.getContent())
				.regTime(currentDateTime)
				.user(user)
				.community(community)
				.parent(comment)
				.build();
		
		commentRepository.save(subComment);
	}
	
	@Override
	public SubCommentGetListWrapperResponseDto getSubCommentList(UUID commentId) {

		List<SubCommentGetListResponseDto> list = new ArrayList<>();
		Comment comment = commentRepository.findById(commentId).get();
		
		for(Comment c : commentRepository.findByParentLikeOrderByRegTime(comment).get()) {
			if(c.isDelYn()) continue;
			list.add(
				new SubCommentGetListResponseDto(c.getUser().getUserName(),
				c.getContent(), c.getRegTime(), c.getId())
			);
		}
		
		return new SubCommentGetListWrapperResponseDto(list);
	}
	
	@Override
	public boolean updateSubComment(String accessToken, CommentUpdateRequestDto commentUpdateRequestDto) {
		String loginId = getLoginIdFromToken(accessToken);
		
		UUID userId = authRepository.findByLoginId(loginId).get().getUser().getId();
		// 수정할 Comment
		Comment comment = commentRepository.findById(commentUpdateRequestDto.getCommentId()).get();
		
		if(userId != comment.getUser().getId()) return false;
		
		comment.update(commentUpdateRequestDto.getContent());
		commentRepository.save(comment);
		
		return true;
	}
	
	@Override
	public boolean deleteSubComment(String accessToken, UUID commentId) {
		String loginId = getLoginIdFromToken(accessToken);
		
		UUID userId = authRepository.findByLoginId(loginId).get().getUser().getId();
		// 삭제할 Comment
		Comment subComment = commentRepository.findById(commentId).get();
		
		if(userId != subComment.getUser().getId()) return false;
		
		subComment.update(true);
		
		commentRepository.save(subComment);
		return true;
	}
	
	@Override
	public String getLoginIdFromToken(String accessToken) {
		String token = accessToken.split(" ")[1];
		return jwtAuthenticationProvider.getUsername(token);
	}
}
