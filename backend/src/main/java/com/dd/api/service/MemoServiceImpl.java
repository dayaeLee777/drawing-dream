package com.dd.api.service;

import java.time.LocalDateTime;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.MemoRegistRequestDto;
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

}
