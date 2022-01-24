package com.dd.db.entity.addon;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.user.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Checklist extends BaseEntity {
	
	private String content;

	private boolean isChecked;
	
	private boolean delYn;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
}
