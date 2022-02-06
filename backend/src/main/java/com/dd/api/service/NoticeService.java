package com.dd.api.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dd.api.dto.request.NoticeRegisterRequestDto;

public interface NoticeService {

	int registerNotice(String accessToken, List<MultipartFile> multipartFile, NoticeRegisterRequestDto noticeRegisterRequestDto);
//	boolean updateNotice(String accessToken, CommunityUpdateRequestDto communityUpdateRequestDto);
//	List<NoticeGetResponseDto> getNoticeList(String accessToken);
//	NoticeGetResponseDto getNotice(UUID noticeId);
//	void plusCommunityHit(Notice notice);
//	boolean deleteNotice(String accessToken, UUID noticeId);
}
