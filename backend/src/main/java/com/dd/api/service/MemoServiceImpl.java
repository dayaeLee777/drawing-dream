package com.dd.api.service;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.MemoRegistRequestDto;
import com.dd.api.dto.request.MemoUpdateRequestDto;
import com.dd.api.dto.response.MemoResponseDto;
import com.dd.db.entity.addon.Memo;
import com.dd.db.entity.user.User;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.MemoRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Service("memoService")
@RequiredArgsConstructor
public class MemoServiceImpl implements MemoService {

	private final AuthRepository authRepository;

	private final MemoRepository memoRepository;

	private final JwtAuthenticationProvider jwtAuthenticationProvider;

	@Transactional
	@Override
	public Memo createMemo(String accessToken, MemoRegistRequestDto memoRegistRequestDto) {
		String token = accessToken.split(" ")[1];
		String loginId = jwtAuthenticationProvider.getUsername(token);
		User user = authRepository.findByLoginId(loginId).get().getUser();

		LocalDateTime currentDateTime = LocalDateTime.now();
		
		Memo memo = Memo.builder()
				.content(memoRegistRequestDto.getContent())
				.user(user)
				.regTime(currentDateTime)
				.build();
		
		return memoRepository.save(memo);
	}

	@Transactional
	@Override
	public Memo updateMemo(MemoUpdateRequestDto memoUpdateRequestDto) {
		Memo memo = memoRepository.findById(memoUpdateRequestDto.getMemoId()).orElse(null);
		if(memo==null)
			return null;
		
		memo.updateMemo(memoUpdateRequestDto.getContent());
		
		return memoRepository.save(memo);
	}

	@Transactional
	@Override
	public Memo deleteMemo(UUID memoId) {
		Memo memo = memoRepository.findById(memoId).orElse(null);
		if(memo==null)
			return null;
		
		memo.deleteMemo();
		return memoRepository.save(memo);
	}

	@Override
	public MemoResponseDto getMemo(UUID memoId) {
		Memo memo = memoRepository.findById(memoId).orElse(null);
		if(memo==null)
			return null;
		
		MemoResponseDto memoResponseDto = MemoResponseDto.builder()
				.memoId(memo.getId())
				.content(memo.getContent())
				.regTime(memo.getRegTime())
				.build();
		
		return memoResponseDto;
	}

}
