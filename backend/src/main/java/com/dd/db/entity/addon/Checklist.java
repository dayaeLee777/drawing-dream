package com.dd.db.entity.addon;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.user.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Checklist extends BaseEntity {
	
	private String content;

	private LocalDateTime regTime;
	
	private boolean isChecked;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@Builder
	public Checklist(String content, LocalDateTime regTime, boolean isChecked, boolean delYn, User user) {
		super();
		this.regTime = regTime;
		this.content = content;
		this.isChecked = isChecked;
		this.delYn = delYn;
		this.user = user;
	}
	
	public void updateChecklist(String content, boolean isChecked) {
		this.content = content;
		this.isChecked = isChecked;
	}
	
	public void deleteChecklist() {
		this.delYn = true;
	}
	
}
