package com.dd.db.entity.chat;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.dd.db.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
// pub/sub 방식을 이용하면
// 구독자 관리가 알아서 되므로 Set<> 으로 관리했던 웹소켓 세션 관리가 필요 없어짐
// 발송의 구현도 알아서 해결이 되므로 일일이 클라이언트에게 메시지를 발송하는 구현이 없어짐
public class ChatRoom extends BaseEntity {

	// 채팅방 이름
	@Column(nullable = false)
	private String name;

}
