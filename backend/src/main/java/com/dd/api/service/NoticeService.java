package com.dd.api.service;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.dd.api.dto.request.NoticeRegisterRequestDto;
import com.dd.api.dto.response.NoticeGetResponseDto;
import com.dd.db.entity.board.Notice;

public interface NoticeService {

	int registerNotice(String accessToken, List<MultipartFile> multipartFile, NoticeRegisterRequestDto noticeRegisterRequestDto);
//	int registerNotice(String accessToken, MultipartFile multipartFile, NoticeRegisterRequestDto noticeRegisterRequestDto);
//	int registerNotice(String accessToken, NoticeRegisterRequestDto noticeRegisterRequestDto);
//	boolean updateNotice(String accessToken, CommunityUpdateRequestDto communityUpdateRequestDto);
	List<NoticeGetResponseDto> getNoticeList(String accessToken);
//	NoticeGetResponseDto getNotice(UUID noticeId);
//	void plusCommunityHit(Notice notice);
	Notice deleteNotice(UUID noticeId);
}
