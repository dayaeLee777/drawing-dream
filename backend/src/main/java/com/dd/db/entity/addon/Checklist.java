package com.dd.db.entity.addon;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.user.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Checklist {
	
	private String content;

	private boolean isChecked;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
}
