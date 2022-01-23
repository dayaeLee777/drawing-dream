package com.dd.db.entity.user;


import javax.persistence.Column;
import javax.persistence.Entity;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.school.School;
import com.dd.db.enums.Code;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
	
	public User(String userName, String userEmail, String address, String phone, String parentPhone) {
		this.userName = userName;
		this.userEmail = userEmail;
		this.address = address;
		this.phone = phone;
		this.parentPhone = parentPhone;
	}
	
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

	public void setUser_name(String userName) {
		this.userName = userName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUser_email(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getParents_phone() {
		return parentPhone;
	}

	public void setParents_phone(String parents_phone) {
		this.parentPhone = parents_phone;
	}

	public boolean isDelYn() {
		return delYn;
	}

	public void setDelYn(boolean delYn) {
		this.delYn = delYn;
	}

}


