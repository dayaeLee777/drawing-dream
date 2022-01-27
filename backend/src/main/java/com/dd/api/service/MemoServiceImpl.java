package com.dd.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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

	@Transactional
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

	@Transactional
	@Override
	public List<MemoResponseDto> getMemoList(String accessToken) {
		String token = accessToken.split(" ")[1];
		String loginId = jwtAuthenticationProvider.getUsername(token);
		User user = authRepository.findByLoginId(loginId).get().getUser();
		List<MemoResponseDto> memoList = new ArrayList<MemoResponseDto>();
		memoRepository.findByUserIdAndDelYnOrderByRegTimeDesc(user.getId(), false).forEach(memo -> {
			MemoResponseDto memoResponseDto = MemoResponseDto.builder()
					.content(memo.getContent())
					.memoId(memo.getId())
					.regTime(memo.getRegTime())
					.build();
			memoList.add(memoResponseDto);
		});
		return memoList;
	}

}
