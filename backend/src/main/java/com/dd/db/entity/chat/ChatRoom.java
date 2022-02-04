package com.dd.db.entity.chat;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.dd.db.entity.BaseEntity;

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
public class ChatRoom extends BaseEntity {

	// 채팅방 이름
	@Column(nullable = false)
	private String name;

	// 채팅방 인원 수
	@Column(nullable = false)
	private int headCount;

	public void setHeadCount(int headCount) {
		this.headCount = headCount;
	}

}
