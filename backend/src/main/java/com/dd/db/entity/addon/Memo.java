package com.dd.db.entity.addon;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.user.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@Entity
public class Memo extends BaseEntity {
	
	@Lob
	private String content;
	
	private LocalDateTime regTime;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@Builder
	public Memo(String content, LocalDateTime regTime, boolean delYn, User user) {
		super();
		this.content = content;
		this.regTime = regTime;
		this.delYn = delYn;
		this.user = user;
	}
	
	public void updateMemo(String content) {
		this.content = content;
	}
	
	public void deleteMemo() {
		this.delYn = true;
	}
	
}
