package com.dd.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.dd.common.util.StompHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
// STOMP 사용
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	private final StompHandler stompHandler;
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// Stomp WebSocket 의 연결 Endpoint : /ws-dd
		// 즉, 개발 서버의 접속 주소 : ws://localhost:8080/ws-dd
		// WebSocket 또는 SockJS 는 /ws-dd 와 핸드쉐이크 과정을 통해 커넥션 연결
		registry.addEndpoint("/ws-dd")
				.setAllowedOriginPatterns("*")
				// 클라이언트와의 연결은 SockJS() 로 함
				.withSockJS();
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		// 메시지를 구독하는 요청의 prefix : /topic(1:N), /queue(1:1) -> 바로 message broker 에게 전달
		registry.enableSimpleBroker("/topic", "/queue");
		// 메시지를 발행하는 요청의 prefix : /app 으로 시작
		// => @Controller 클래스 내부의 @MessageMapping 메소드로 라우팅 된 후 broker 로 메시지 전달
		registry.setApplicationDestinationPrefixes("/app");
	}

	@Override
	public void configureClientInboundChannel(ChannelRegistration registration) {
		registration.interceptors(stompHandler);
	}

}
