package com.dd.db.entity.files;

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
public class ProfileImg extends BaseEntity {
	
	private String originFileName;
	
	private String newFileName;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@Builder
	public ProfileImg(String originFileName, String newFileName, User user) {
		super();
		this.originFileName = originFileName;
		this.newFileName = newFileName;
		this.user = user;
	}
	
	public void updateImg(String originFileName, String newFileName) {
		this.originFileName = originFileName;
		this.newFileName = newFileName;
	}
}
