package com.dd.common.util;

import java.util.Objects;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {

	private final JwtAuthenticationProvider jwtAuthenticationProvider;

	// WebSocket 을 통해 들어온 요청이 처리 되기 전 실행
	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		System.out.println(accessor);

		// WebSocket 연결 시 헤더의 jwt 검증
		if (StompCommand.CONNECT.equals(accessor.getCommand())) {
			System.out.println("!!!@@@" + accessor.getFirstNativeHeader("Authorization"));
			jwtAuthenticationProvider.validateToken(
					Objects.requireNonNull(accessor.getFirstNativeHeader("Authorization")).split(" ")[1]);
			
//			if (user != null) {
//				List<GrantedAuthority> authorities = new ArrayList<>();
//				authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
//				Authentication auth = new UsernamePasswordAuthenticationToken(user, user, authorities);
//				SecurityContextHolder.getContext().setAuthentication(auth);
//				accessor.setUser(auth);
//			}
		}

		return message;
	}

}
