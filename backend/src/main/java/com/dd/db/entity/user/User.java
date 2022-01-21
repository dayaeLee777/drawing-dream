package com.dd.db.entity.user;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.dd.db.entity.BaseEntity;

@Entity
public class User extends BaseEntity {
	
	private String user_name;
	
	private String user_email;
	
	private String address;
	
	private String phone;
	
	private String parents_phone;
	
	private boolean delYn;
	
	@OneToMany(mappedBy = "user",  cascade = CascadeType.ALL)
    List<Auth> auths = new ArrayList<Auth>();
    
	@OneToMany(mappedBy = "user",  cascade = CascadeType.ALL)
    List<UserDepartment> userDepartments = new ArrayList<UserDepartment>();
	
	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getUser_email() {
		return user_email;
	}

	public void setUser_email(String user_email) {
		this.user_email = user_email;
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
		return parents_phone;
	}

	public void setParents_phone(String parents_phone) {
		this.parents_phone = parents_phone;
	}

	public boolean isDelYn() {
		return delYn;
	}

	public void setDelYn(boolean delYn) {
		this.delYn = delYn;
	}

}
