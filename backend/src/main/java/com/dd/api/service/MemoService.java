package com.dd.api.service;

import java.util.List;
import java.util.UUID;

import com.dd.api.dto.request.MemoRegistRequestDto;
import com.dd.api.dto.request.MemoUpdateRequestDto;
import com.dd.api.dto.response.MemoResponseDto;
import com.dd.db.entity.addon.Memo;

public interface MemoService {
	Memo createMemo(String accessToken, MemoRegistRequestDto memoRegistRequestDto);
	Memo updateMemo(MemoUpdateRequestDto memoUpdateRequestDto);
	Memo deleteMemo(UUID memoId);
	MemoResponseDto getMemo(UUID memoId);
	List<MemoResponseDto> getMemoList(String accessToken);
}
