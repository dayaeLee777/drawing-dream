package com.dd.api.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.dd.api.dto.request.NoticeRegisterRequestDto;
import com.dd.api.dto.request.NoticeUpdateRequestDto;
import com.dd.api.dto.response.NoticeGetListResponseDto;
import com.dd.api.dto.response.NoticeGetResponseDto;
import com.dd.api.dto.response.TotalNoticeGetResponseDto;
import com.dd.db.entity.board.Notice;

public interface NoticeService {

	int registerNotice(String accessToken, List<MultipartFile> multipartFile, NoticeRegisterRequestDto noticeRegisterRequestDto);
	List<NoticeGetListResponseDto> getNoticeList(String accessToken, Pageable pageable);
	NoticeGetResponseDto getNotice(UUID noticeId);
	TotalNoticeGetResponseDto getTotalCount(String accessToken);
	Notice updateNotice(String accessToken, List<MultipartFile> multipartFile, NoticeUpdateRequestDto noticeUpdateRequestDto);
	Notice deleteNotice(UUID noticeId);
	
}
