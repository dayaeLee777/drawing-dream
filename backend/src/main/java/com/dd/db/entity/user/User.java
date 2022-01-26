package com.dd.db.entity.user;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.dd.db.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
	
	@Column(name="user_name")
	private String userName;
	
	@Column(name="user_email")
	private String userEmail;

	private String address;

	private String phone;
	
	@Column(name="parent_phone")
	private String parentPhone;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	public void update(String userEmail, String address) {
		this.userEmail = userEmail;
		this.address = address;
	}

}