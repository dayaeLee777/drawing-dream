package com.dd.db.entity.chat;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ChatMessage extends BaseEntity {

	// 내용
	private String content;

	// 시간
	private LocalDateTime sendTime;

	// 채팅방
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id")
	private ChatRoom chatRoom;

	// 작성자
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User writer;

}
