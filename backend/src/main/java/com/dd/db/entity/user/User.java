package com.dd.db.entity.user;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.dd.db.entity.BaseEntity;

@Entity
public class User extends BaseEntity {
	
	@Column(name="user_name")
	private String userName;
	
	@Column(name="user_email")
	private String userEmail;
	
	private String address;
	
	private String phone;
	
	@Column(name="parent_phone")
	private String parentPhone;
	
	@Column(name="del_yn")
	private boolean delYn;
	
	public String getUserName() {
		return userName;
	}

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
