package com.dd.db.entity.board;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Community extends BaseEntity {
	
	private String title;
	
	@Lob
	private String content;
	
	@Column(name="hit", columnDefinition="INT DEFAULT 0")
	private int hit;
	
	private LocalDateTime regTime;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "school_id")
	private School school;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	
	// 커뮤니티 글 수정 - [제목, 내용] 수정
	public void update(String title, String content) {
		this.title = title;
		this.content = content;
	}

	// 커뮤니티 글 삭제 - [커뮤니티 글 삭제 여부] - 삭제 반영
	public void update(boolean delYn) {
		this.delYn = delYn;
	}
	
	// 커뮤니티 글 조회수 증가 - [조회수] 수정
	public void updateHit() {
		this.hit = this.hit + 1;
	}
}
