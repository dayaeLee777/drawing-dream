package com.dd.api.service;

import com.dd.api.dto.request.MemoRegistRequestDto;
import com.dd.db.entity.addon.Memo;

public interface MemoService {
	Memo createMemo(String accaccessToken, MemoRegistRequestDto memoRegistRequestDto);
}
